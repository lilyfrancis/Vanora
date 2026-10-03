(function () {
  'use strict';

  var scriptTag = document.currentScript;
  var csrfToken = scriptTag ? scriptTag.getAttribute('data-csrf') : '';

  // ---- Slug auto-generation from title -----------------------------------
  var titleEl = document.getElementById('title');
  var slugEl = document.getElementById('slug');
  if (titleEl && slugEl) {
    var slugManuallyEdited = slugEl.value.trim() !== '';
    slugEl.addEventListener('input', function () { slugManuallyEdited = true; });
    titleEl.addEventListener('input', function () {
      if (slugManuallyEdited) return;
      slugEl.value = titleEl.value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    });
  }

  // ---- Write / Preview tabs with live markdown preview --------------------
  var tabs = document.querySelectorAll('.editor-tab');
  var bodyEl = document.getElementById('body_markdown');
  var previewEl = document.querySelector('.editor-preview');
  var previewTimer = null;

  function renderPreview() {
    if (!previewEl) return;
    previewEl.textContent = 'Loading preview…';
    var formData = new FormData();
    formData.append('body_markdown', bodyEl.value);
    fetch('preview.php', { method: 'POST', body: formData })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        previewEl.innerHTML = data.html || '<p><em>Nothing to preview yet.</em></p>';
      })
      .catch(function () {
        previewEl.textContent = 'Could not load preview.';
      });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      var target = tab.getAttribute('data-tab');
      document.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-tab-panel') !== target;
      });
      if (target === 'preview') renderPreview();
    });
  });

  if (bodyEl) {
    bodyEl.addEventListener('input', function () {
      if (previewEl && !previewEl.hidden) {
        clearTimeout(previewTimer);
        previewTimer = setTimeout(renderPreview, 500);
      }
    });
  }

  // ---- Featured image upload ----------------------------------------------
  var imageFile = document.getElementById('imageFile');
  var imagePreviewWrap = document.getElementById('imagePreviewWrap');
  var imagePreview = document.getElementById('imagePreview');
  var featuredImageInput = document.getElementById('featuredImageInput');
  var imageUploadStatus = document.getElementById('imageUploadStatus');

  if (imageFile) {
    imageFile.addEventListener('change', function () {
      var file = imageFile.files[0];
      if (!file) return;

      imageUploadStatus.textContent = 'Uploading…';
      imageUploadStatus.className = 'admin-status';

      var formData = new FormData();
      formData.append('image', file);
      formData.append('csrf_token', csrfToken);

      fetch('upload-image.php', { method: 'POST', body: formData })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.error) {
            imageUploadStatus.textContent = data.error;
            imageUploadStatus.className = 'admin-status admin-status--error';
            return;
          }
          featuredImageInput.value = data.url;
          imagePreview.src = '../' + data.url;
          imagePreviewWrap.hidden = false;
          imageUploadStatus.textContent = 'Uploaded.';
          imageUploadStatus.className = 'admin-status admin-status--success';
        })
        .catch(function () {
          imageUploadStatus.textContent = 'Upload failed. Try again.';
          imageUploadStatus.className = 'admin-status admin-status--error';
        });
    });
  }
})();
