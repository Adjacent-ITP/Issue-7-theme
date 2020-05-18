
<div class="posts">
  <?php $count = 0; ?>
  <?php while (have_posts()) : ?>
  	<?php the_post(); $count++; ?>
    <div class="posts__item" style="--index: <?php echo $count; ?>;">
      <a href="<?php the_permalink(); ?>" class="posts__link">
        <img src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/number_<?php echo $count;?>.svg" alt="logo" class="posts__link-number">
        <h1 class="posts__link-title -f-headline-b"> <?php the_title() ?> </h1>
        <h2 class="posts__link-author -f-author"> Interactive Pope </h2>
      </a>
    </div>
  <?php endwhile; ?>
</div>





<script id="fragmentShader" type="x-shader/x-fragment">

  #define PI    3.14159265
  #define TWOPI 6.28318531
  #extension GL_OES_standard_derivatives : enable

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vGlobalNormal;
  varying vec3 vPosition;
  varying vec4 vGlobalPosition;
  varying vec4 vMousePosition;
  varying vec3 vFragVertexEc;

  uniform vec2 mouse;

  uniform bool depthBasedShading;
  uniform vec3 darkColor;
  uniform vec3 brightColor;
  uniform vec3 lightPosition;

  uniform float minColorDistance;
  uniform float maxColorDistance;
  uniform float lightIntensity;
  uniform float ambientLightIntensity;
  uniform float brightnessMultiplier;


  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      // Gradients
      // ( N*N points uniformly over a square, mapped onto an octahedron.)
      float n_ = 1.0/7.0; // N=7
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
      dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      float brightness = 0.5; // 0...1

      // if (depthBasedShading) {
      brightness = clamp(length(vPosition) * 0.3, minColorDistance, maxColorDistance);
      brightness = pow(brightness, 1.5);

      vec4 col = vec4(darkColor, 1.0) + brightnessMultiplier * lightIntensity * (brightness + ambientLightIntensity) * vec4(brightColor - darkColor, 1.0);

      col.xyz += 0.3*snoise(vPosition*0.2 + snoise(vNormal*0.8));
      // } else {
      //   vec3 X = dFdx(vGlobalPosition.xyz);
      //   vec3 Y = dFdy(vGlobalPosition.xyz);
      //   vec3 faceNormal = normalize(cross(X,Y));
      //   brightness = dot(faceNormal, normalize(lightPosition));
      // }

      gl_FragColor = col + vec4(1.,0.,0.,1.);
    }


</script>

<script id="vertexShader" type="x-shader/x-vertex">

  #define PI 3.14159265
  #define TWOPI 6.28318531

  #ifdef GL_ES
  precision highp float;
  #endif

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vGlobalNormal;
  varying vec3 vPosition;
  varying vec4 vGlobalPosition;

  varying vec4 vMousePosition;

  uniform float time;
  uniform vec2 mouse;
  uniform vec3 mouseCast;

  uniform float shape1A;
  uniform float shape1B;
  uniform float shape1M;
  uniform float shape1N1;
  uniform float shape1N2;
  uniform float shape1N3;

  uniform float shape2A;
  uniform float shape2B;
  uniform float shape2M;
  uniform float shape2N1;
  uniform float shape2N2;
  uniform float shape2N3;

  float radiusForAngle(float angle, float a, float b, float m, float n1, float n2, float n3) {
    float tempA = abs(cos(angle * m * 0.25) / a);
    float tempB = abs(sin(angle * m * 0.25) / b);
    float tempAB = pow(tempA, n2) + pow(tempB, n3);
    return abs(pow(tempAB, - 1.0 / n1));
  }

  vec3 superPositionForPosition(vec3 p) {
    float r = length(p);

    float phi = atan(p.y, p.x);
    float theta = r == 0.0 ? 0.0 : asin(p.z / r);

    // float superRadiusPhi = radiusForAngle(phi, shape1A+0.5*sin(time+p.x), shape1B+0.5*sin(time+p.y), shape1M+0.5*sin(time), shape1N1, shape1N2, shape1N3);
    // float superRadiusTheta = radiusForAngle(theta, shape2A, shape2B, shape2M, shape2N1+0.5*sin(time+p.x), shape2N2+0.5*sin(time+p.y), shape2N3+0.5*sin(time+p.x+p.y));

    float superRadiusPhi = radiusForAngle(phi, shape1A+0.2*sin(3.+time*0.8), shape1B, shape1M, shape1N1, shape1N2, shape1N3);
    float superRadiusTheta = radiusForAngle(theta, shape2A, shape2B, shape2M, shape2N1, shape2N2, shape2N3);

    p.x = r * superRadiusPhi * cos(phi) * superRadiusTheta * cos(theta);
    p.y = r * superRadiusPhi * sin(phi) * superRadiusTheta * cos(theta);
    p.z = r * superRadiusTheta * sin(theta);

    return p;
  }

  void main() {
    vUv = uv;

    vNormal = normal;
    vGlobalNormal = normalize(normalMatrix * normal);

    vPosition = superPositionForPosition(position);

    vGlobalPosition = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);

    float d = distance(vGlobalPosition.xyz, mouseCast);

    float s = smoothstep(5., 15., d);

    vPosition = superPositionForPosition(position + s*vNormal.xyz);
    vGlobalPosition = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);

    gl_Position = vGlobalPosition;
  }


</script>
