
<!-- OBJ PREVIOOUS -->
<div class="posts blobtest">
<?php $count = 0; ?>
<?php while (have_posts()) : ?>
<?php the_post(); $count++; ?>
<!-- <div class="posts__item" style="--index: <?php echo $count; ?>;"> -->
<a href="<?php the_permalink(); ?>" class="posts__link">
<img src="<?php echo get_bloginfo('template_directory'); ?>/public/assets/number_<?php echo $count;?>.svg" alt="logo" class="posts__link-number">
<h1 class="posts__link-title -f-headline-b"> <?php the_title() ?> </h1>
<h2 class="posts__link-author -f-author"> Interactive Pope </h2>
</a>
<div class="-f-author"> <?php the_content(); ?> </div>
<div class="-f-author"> <?php the_content(); ?> </div>
<div class="-f-author"> <?php the_content(); ?> </div>

<!-- </div> -->
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

  uniform float time;
  // uniform vec2 mouse;

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

  /*
  color: rgb(0.7137254902, 0.7568627451, 0.7254901961);
  color: rgb(0.7098039216, 0.8156862745, 0.6392156863);
  color: rgb(0.6666666667, 0.7725490196, 0.8470588235);

  */
  void main() {
    float brightness = 0.5; // 0...1
    vec3 c1 = vec3(0.7237254902, 0.7668627451, 0.7354901961);
     vec3 c2 = vec3(0.7198039216, 0.8256862745, 0.6492156863);
     vec3 c3 = vec3(0.6766666667, 0.7825490196, 0.8570588235);

    // if (depthBasedShading) {
      brightness = clamp(length(vPosition) * 0.3, minColorDistance, maxColorDistance);
      brightness = pow(brightness, 1.5);

      vec4 col = vec4(c3, 1.0) + brightnessMultiplier * lightIntensity * (brightness + ambientLightIntensity) * vec4(c2 - c3, 1.0);

      col.xyz += 0.3*snoise(vPosition*0.2 + snoise(vNormal*0.8));
    // } else {
    //   vec3 X = dFdx(vGlobalPosition.xyz);
    //   vec3 Y = dFdy(vGlobalPosition.xyz);
    //   vec3 faceNormal = normalize(cross(X,Y));
    //   brightness = dot(faceNormal, normalize(lightPosition));
    // }
    gl_FragColor = col + vec4(1.,0.,0.,1.);

    // vec3 c1 = vec3(0.7237254902, 0.7668627451, 0.7354901961);
    // vec3 c2 = vec3(0.7198039216, 0.8256862745, 0.6492156863);
    // vec3 c3 = vec3(0.6766666667, 0.7825490196, 0.8570588235);
    //
    // vec3 p = normalize(vPosition.xyz);
    // vec3 n = vNormal;//*0.5+0.5;
    //
    // // float d1 = dot(vNormal,c1) * snoise(n);
    // // float d2 = dot(vNormal,c2) * snoise(n);
    // // float d3 = dot(vNormal,c3) * snoise(n);
    //
    // // vec3 color = n * max(d1, max(d2, d3));
    // // color = 0.3*color + 0.7*c1;
    //
    //
    // // vec3 cn = vec3( p + snoise(p + snoise(n)) );
    // // float cnn = snoise(cn);
    // //
    // // vec3 dd = mix(c1, c2, cnn);
    // //
    // // vec3 color = dd;//0.4*p + 0.2*n + 0.4*dd;
    //
    //
    // float m1 = snoise(p + snoise(n + time*.0001));
    // float m2 = snoise(p + snoise(n*1.2 + time*.003 ));
    // float m3 = snoise(0.6*p + snoise(n*1.1 + time*.00024 ));
    //
    // // vec3 d1 = mix(c1, c2, m1);
    // // vec3 d2 = mix(c2, c3, m2);
    // // vec3 d3 = mix(c3, c1, m3);
    //
    // vec3 d1 = mix(c1, c2, m1);
    // vec3 d2 = mix(c2, c3, m2);
    // vec3 d3 = mix(c3, c1, m3);
    //
    // // vec3 s1 = smoothstep(0., 0.333, n) * 0.3;
    // // vec3 s2 = smoothstep(0.339, 0.666, n) * 0.3;
    // // vec3 s3 = smoothstep(0.6669, 1., n) * 0.3;
    //
    // vec3 color = d2;
    //
    // // color += snoise(normalize(vPosition.xyz + snoise(vNormal.xyz)));
    //
    // gl_FragColor = vec4(color,1.);
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

  float radiusForAngle(float angle, float a, float b, float m, float n1, float n2, float n3) {
    float tempA = abs(cos(angle * m * 0.25) / a);
    float tempB = abs(sin(angle * m * 0.25) / b);
    float tempAB = pow(tempA, n2) + pow(tempB, n3);
    return abs(pow(tempAB, - 1.0 / n1));
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    vGlobalNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vGlobalPosition = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
    gl_Position = vGlobalPosition;
  }
</script>
