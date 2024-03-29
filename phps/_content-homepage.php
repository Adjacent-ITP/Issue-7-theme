
<div class="posts">
  <?php $count = 0; ?>
  <?php while (have_posts()) : ?>
  	<?php the_post(); $count++; ?>
    <div class="posts__item -item-<?php echo $count; ?>">
      <a href="<?php the_permalink(); ?>" class="posts__link">
        <img src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/number_<?php echo $count;?>.svg" alt="logo" class="posts__link-number">

        <h1 class="posts__link-title -f-headline-b"> <?php the_title() ?> </h1>
        <h2 class="posts__link-author -f-subtitle"> <?php echo get_field('author_name') ?></h2>

        <p class="posts__link-desc -f-paragraph">
          <?php echo wp_trim_words(get_field('blurb'), 24) ?>
        </p>
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
  varying vec3 dir;

  uniform float time;
  uniform float scroll;
  uniform vec3 mouse;
  uniform vec3 camera;

  uniform vec3 darkColor;
  uniform vec3 brightColor;



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
    vec4 p = permute(
      permute(
        permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0 )
      ) + i.x + vec4(0.0, i1.x, i2.x, 1.0 )
    );

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

    vec3 c1 = brightColor;//vec3(0.7198039216, 0.8256862745, 0.6492156863);
    vec3 c2 = darkColor;//vec3(0.6766666667, 0.7825490196, 0.8570588235);

    vec3 normal = normalize( cross(dFdx(vPosition), dFdy(vPosition)) );

    vec3 p = normalize(vPosition);
    vec3 np = normalize( vPosition + snoise( p*0.8) + 0.4*sin(vPosition.x +time*2.)  + 0.3*sin(vPosition.y +time*1.5) );

    vec3 contrastAmp = vec3(8.);
    float contrast = length( pow( abs(np), contrastAmp) ) ;
    float brightness = 0.14;
    float n =  brightness + contrast;

    // n += 0.2*sin(n + time*0.1)*0.5+0.5;

    vec3 col = mix(c2,c1, n );//vec3(n);

    // float d = distance(vGlobalPosition.xyz/20., vec3(mouse, 1.) );
    gl_FragColor = vec4(col,1.);//col ;
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

  varying vec3 dir;

  uniform float time;
  uniform vec3 mouse;
  uniform vec3 camera;

  uniform vec3 shape1;
  uniform vec3 shape2;
  uniform vec3 shape3;
  uniform vec3 shape4;

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

    float superRadiusPhi = radiusForAngle(phi, shape1.x, shape1.y, shape1.z, shape2.x, shape2.y, shape2.z);
    float superRadiusTheta = radiusForAngle(theta, shape3.x, shape3.y, shape3.z, shape4.x, shape4.y, shape4.z);

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


    vec3 pdir = normalize(vGlobalPosition.xyz - mouse);
    // dir = vec3( normalize(pdir) );
    float d = distance(vGlobalPosition.xyz, mouse);
    d = pow(d/10.,4.)/1000.;
    dir = vec3( d );

    // float d = distance(vGlobalPosition.xyz/20., vec3(mouse, 1.));
    float s = 1.-smoothstep(0., 0.5, d);
    vPosition = superPositionForPosition(position - 3.5*s*pdir);

    vGlobalPosition = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
    gl_Position = vGlobalPosition;
  }


</script>
