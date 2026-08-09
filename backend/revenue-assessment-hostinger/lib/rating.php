<?php
/**
 * Revenue Leakage Assessment — rating logic.
 *
 * Mirrors the client-side scoring exactly (see the brief, Section 13,
 * "Rating logic"). Six single-select diagnostic answers, each tagged
 * strong/attention/gap by the option the respondent picked. The overall
 * rating is the most frequent tag, ties broken toward the more cautious
 * tag. No numeric score, no dollar figure — labels only.
 */

const DIAGNOSTIC_QUESTIONS = [
    'leadResponseTime' => [
        'always_24h' => 'strong',
        'inconsistent' => 'attention',
        'no_followup' => 'gap',
    ],
    'salesProcess' => [
        'clear_repeatable' => 'strong',
        'some_structure' => 'attention',
        'no_defined_process' => 'gap',
    ],
    'proposalSpeed' => [
        'same_day_48h' => 'strong',
        'three_to_seven_days' => 'attention',
        'over_a_week' => 'gap',
    ],
    'collectionsProcess' => [
        'automated_reminders' => 'strong',
        'manual_occasional' => 'attention',
        'no_consistent_process' => 'gap',
    ],
    'renewalTracking' => [
        'proactive_advance' => 'strong',
        'tracked_reactive' => 'attention',
        'not_tracked' => 'gap',
    ],
    'adminWorkload' => [
        'minimal_automated' => 'strong',
        'moderate_manual' => 'attention',
        'heavy_manual' => 'gap',
    ],
];

const RATING_LABELS = [
    'strong' => 'Strong',
    'attention' => 'Needs Attention',
    'gap' => 'High-Priority Gap',
];

/**
 * @param array $answers e.g. ['leadResponseTime' => 'always_24h', ...]
 * @return array{categoryTags: array<string,string>, overallTag: string, categoryLabels: array<string,string>, overallLabel: string}
 * @throws InvalidArgumentException if an answer is missing or not a recognised option.
 */
function score_assessment(array $answers): array
{
    $categoryTags = [];

    foreach (DIAGNOSTIC_QUESTIONS as $question => $options) {
        $choice = $answers[$question] ?? null;
        if (!is_string($choice) || !isset($options[$choice])) {
            throw new InvalidArgumentException("Missing or invalid answer for: {$question}");
        }
        $categoryTags[$question] = $options[$choice];
    }

    $counts = ['strong' => 0, 'attention' => 0, 'gap' => 0];
    foreach ($categoryTags as $tag) {
        $counts[$tag]++;
    }

    // Mode, ties broken toward the more cautious tag (gap > attention > strong).
    $overallTag = 'strong';
    $best = -1;
    foreach (['gap', 'attention', 'strong'] as $tag) {
        if ($counts[$tag] > $best) {
            $best = $counts[$tag];
            $overallTag = $tag;
        }
    }

    $categoryLabels = array_map(fn($tag) => RATING_LABELS[$tag], $categoryTags);

    return [
        'categoryTags' => $categoryTags,
        'categoryLabels' => $categoryLabels,
        'overallTag' => $overallTag,
        'overallLabel' => RATING_LABELS[$overallTag],
    ];
}
