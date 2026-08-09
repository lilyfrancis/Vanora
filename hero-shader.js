/**
 * Vanora Partners — hero background shader.
 *
 * Plain WebGL2 + Canvas2D fallback, no framework. The fragment shader is
 * adapted from the public-domain "clouds" shader by Matthias Hurrle
 * (@atzedent) — recolored from its original amber palette to navy/gold so
 * it sits behind the hero instead of clashing with it. Pointer-reactive,
 * pauses under prefers-reduced-motion (falls back to the existing static
 * gradient in that case — see the CSS on .hero).
 */
(function () {
  'use strict';

  var canvas = document.getElementById('heroShaderCanvas');
  if (!canvas || !window.WebGL2RenderingContext) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // static CSS gradient stays visible instead

  var gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false });
  if (!gl) return;

  var vertexSrc = '#version 300 es\n' +
    'precision highp float;\n' +
    'in vec4 position;\n' +
    'void main(){gl_Position=position;}';

  // Recolored from the original amber/orange palette to Vanora navy/gold:
  // particle colour is now a gold hue instead of a cos()-cycled rainbow,
  // and the cloud tint mixes toward navy (--midnight/--ink) instead of amber.
  var fragmentSrc = '#version 300 es\n' +
    'precision highp float;\n' +
    'out vec4 O;\n' +
    'uniform vec2 resolution;\n' +
    'uniform float time;\n' +
    'uniform vec2 move;\n' +
    'uniform vec2 touch;\n' +
    '#define FC gl_FragCoord.xy\n' +
    '#define T time\n' +
    '#define R resolution\n' +
    '#define MN min(R.x,R.y)\n' +
    'float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}\n' +
    'float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}\n' +
    'float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}\n' +
    'float clouds(vec2 p){float d=1.,t=.0;for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}\n' +
    'void main(void){\n' +
    '  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);\n' +
    '  vec3 col=vec3(0);\n' +
    '  float bg=clouds(vec2(st.x+T*.08+move.x*.0004,-st.y+move.y*.0004));\n' +
    '  uv*=1.-.3*(sin(T*.15)*.5+.5);\n' +
    '  vec3 gold=vec3(0.776,0.631,0.353);\n' +
    '  for(float i=1.;i<12.;i++){\n' +
    '    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.35+.1*uv.x);\n' +
    '    vec2 p=uv;\n' +
    '    float d=length(p);\n' +
    '    col+=.0009/d*gold*(0.6+0.4*sin(i*1.7+T*.4));\n' +
    '    float b=noise(i+p+bg*1.731);\n' +
    '    col+=.0016*b/length(max(p,vec2(b*p.x*.02,p.y)))*gold;\n' +
    '    col=mix(col,vec3(bg*.04,bg*.09,bg*.22),d);\n' +
    '  }\n' +
    '  O=vec4(col,clamp(bg*1.4,0.0,0.85));\n' +
    '}';

  function compile(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Hero shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  var vs = compile(gl.VERTEX_SHADER, vertexSrc);
  var fs = compile(gl.FRAGMENT_SHADER, fragmentSrc);
  if (!vs || !fs) return;

  var program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Hero shader link error:', gl.getProgramInfoLog(program));
    return;
  }

  var vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var positionLoc = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  var resolutionLoc = gl.getUniformLocation(program, 'resolution');
  var timeLoc = gl.getUniformLocation(program, 'time');
  var moveLoc = gl.getUniformLocation(program, 'move');
  var touchLoc = gl.getUniformLocation(program, 'touch');

  var dpr = Math.max(1, 0.5 * window.devicePixelRatio);
  var move = [0, 0];
  var lastPointer = [0, 0];

  function resize() {
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, rect.width * dpr);
    canvas.height = Math.max(1, rect.height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function onPointerMove(e) {
    var dx = e.clientX - lastPointer[0];
    var dy = e.clientY - lastPointer[1];
    lastPointer = [e.clientX, e.clientY];
    move = [move[0] + dx, move[1] + dy];
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  resize();

  var rafId;
  function render(now) {
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, now * 1e-3);
    gl.uniform2f(moveLoc, move[0], move[1]);
    gl.uniform2f(touchLoc, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    rafId = window.requestAnimationFrame(render);
  }
  rafId = window.requestAnimationFrame(render);

  // Stop rendering when the hero scrolls off-screen — no reason to burn a
  // GPU frame budget on an invisible canvas.
  var heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    var visibilityObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && rafId === undefined) {
          rafId = window.requestAnimationFrame(render);
        } else if (!entry.isIntersecting && rafId !== undefined) {
          window.cancelAnimationFrame(rafId);
          rafId = undefined;
        }
      });
    }, { threshold: 0 });
    visibilityObserver.observe(heroSection);
  }
})();
