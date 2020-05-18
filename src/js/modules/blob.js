
let $area = document.querySelector('.content-area__main');
let $areaBounds = $area.getBoundingClientRect();

let $scroller = document.querySelector('.posts');
let $scrollerHeight = $scroller.scrollHeight - $scroller.getBoundingClientRect().height;

let COLOR_1 = new THREE.Color("rgb(213, 157, 1)");
let COLOR_2 = new THREE.Color('rgb(127, 20, 11)');
let COLOR_3 = new THREE.Color('rgb(0,0,0)');

let scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff);
let camera = new THREE.PerspectiveCamera(75, $areaBounds.width/$areaBounds.height, 0.1, 1000);
camera.position.z = 10;

let renderer = new THREE.WebGLRenderer();
renderer.setSize( $areaBounds.width, $areaBounds.height );
// renderer.setClearColor( 0x000000, 0 );
renderer.domElement.classList = "blob";
$area.appendChild( renderer.domElement );

let geometry = new THREE.SphereGeometry( 3,32, 32 );

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(0,0);
let deadMouse = new THREE.Vector3(1000.,1000.,1000.);

let uniforms = {
      "time": { value: 1.0 },
      'shape1A': {'type': 'f', 'value': 0.8},
      'shape1B': {'type': 'f', 'value': 1},
      'shape1M': {'type': 'f', 'value': 14},
      'shape1N1': {'type': 'f', 'value': 2.4},
      'shape1N2': {'type': 'f', 'value': 4},
      'shape1N3': {'type': 'f', 'value': 2.5},
      'shape2A': {'type': 'f', 'value': 0.8},
      'shape2B': {'type': 'f', 'value': 0.5},
      'shape2M': {'type': 'f', 'value': 25},
      'shape2N1': {'type': 'f', 'value': 3.3},
      'shape2N2': {'type': 'f', 'value': 1.5},
      'shape2N3': {'type': 'f', 'value': 0.8},
      'mouse': {'type': 'v2', 'value': mouse},
      'mouseCast': {'type': 'v3', 'value': deadMouse},
      'depthBasedShading': {'type': 'i', 'value': 0},
      'lightPosition': {'type': 'v3', 'value': new THREE.Vector3(0.0, 0.0, 10.0)},
      'brightColor': {'type': 'c', 'value': COLOR_1},
      'darkColor': {'type': 'c', 'value': COLOR_2},
      'minColorDistance': {'type': 'f', 'value': 0.0},
      'maxColorDistance': {'type': 'f', 'value': 1.25},
      'lightIntensity': {'type': 'f', 'value': 1.0},
      // 'lightIntensity': {'type': 'f', 'value': 3.5},
      'ambientLightIntensity': {'type': 'f', 'value': 0.0},
      'brightnessMultiplier': {'type': 'f', 'value': 1.0}
    };

  // let c1 = new THREE.Color();
  // COLOR_1.copy(c1);
  // c1.lerp(COLOR_3, 0);
  // console.log(c1);
  // console.log(COLOR_1);
  // uniforms['brightColor'].value = c1;

let material = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
});

let cube = new THREE.Mesh( geometry, material );
cube.doubleSided = true;
// cube.rotation.y = .2;
cube.rotation.x = -.4;
cube.scale.x = 1.5;
cube.scale.y = 1.5;
cube.scale.z = 1.5;
scene.add( cube );


let animate = ( timestamp ) => {
  requestAnimationFrame( animate );
  raycaster.setFromCamera( mouse, camera );
  var intersect = raycaster.intersectObject( cube );

  if(intersect.length > 0) {
    uniforms[ "mouseCast" ].value = intersect[0].point;
  } else {
    uniforms[ "mouseCast" ].value = deadMouse;
  }

  // uniforms['maxColorDistance'].value = .2*Math.sin(40+timestamp/100)*0.5+0.5;
  // uniforms['minColorDistance'].value = 0.4  *Math.cos(timestamp/100)*0.5+0.5;

  // uniforms['brightColor'].value.b = Math.sin(10+timestamp/100)*0.3+0.3;
  // uniforms['brightColor'].value.r = Math.cos(1099+timestamp/100)*0.3+0.3;
  // uniforms['brightColor'].value.g = Math.cos(99+timestamp/1000)*0.99+0.99;
  //
  // uniforms['darkColor'].value.b = Math.sin(100000+timestamp/100)*0.3+0.3;
  //
  // uniforms['darkColor'].value.g = Math.sin(1200+timestamp/100)*0.3+0.3;

  // cube.rotation.x += 0.001;

  // uniforms[ "time" ].value = timestamp / 1000;
  uniforms[ "mouse" ].value = mouse;

  renderer.render( scene, camera );
};


$area.addEventListener("mousemove", (event) => {
  let x = event.clientX - $areaBounds.x;
  let y = event.clientY - $areaBounds.y;
  mouse.x = (x / $areaBounds.width) * 2 - 1;
  mouse.y = -(y / $areaBounds.height) * 2 + 1;
}, false)


window.addEventListener("resize", () => {
  $areaBounds = $area.getBoundingClientRect();
  camera.aspect = $areaBounds.width / $areaBounds.height;
  camera.updateProjectionMatrix();
  renderer.setSize( $areaBounds.width, $areaBounds.height );
})

$scroller.addEventListener('scroll', () => {
  cube.rotation.y += 0.001;

  let t = $scroller.scrollTop / $scrollerHeight;
  uniforms[ "time" ].value = t*6;


  uniforms['brightColor'].value.b = Math.sin(10+t*10)*0.3+0.3;
  uniforms['brightColor'].value.r = Math.cos(1099+t*10)*0.3+0.3;
  uniforms['brightColor'].value.g = Math.cos(99+t*10)*0.99+0.99;

  uniforms['darkColor'].value.b = Math.sin(100000+t*10)*0.3+0.3;

  uniforms['darkColor'].value.g = Math.sin(1200+t*10)*0.3+0.3;


  // uniforms['maxColorDistance'].value = Math.sin(t)*2+2;

  // 'minColorDistance': {'type': 'f', 'value': 0.0},
  // 'maxColorDistance': {'type': 'f', 'value': 1.25},
  // uniforms['shape2A'].value = .8 +  Math.sin(t*2);
  // uniforms['shape2B'].value = 0.5 +  .7*Math.sin(t*2);
  // uniforms['shape2M'].value = 25 - 3* Math.sin(t*2);
  // uniforms['shape2N1'].value = 3.3 - 2*Math.sin(t*2);
  // uniforms['shape2N2'].value = 1.5 - 1.2*Math.sin(t*2);
  // uniforms['shape2N3'].value = 0.8 + .2*Math.sin(t*2);

  // let c1 = COLOR_1.lerp(new THREE.Color("rgb(0,0,0)"), t);
  // console.log(c1)
  // uniforms['brightColor'].value = c1;

  // 'shape1A': {'type': 'f', 'value': 0.8},
  // 'shape1B': {'type': 'f', 'value': 1},
  // 'shape1M': {'type': 'f', 'value': 14},
  // 'shape1N1': {'type': 'f', 'value': 2.4},
  // 'shape1N2': {'type': 'f', 'value': 4},
  // 'shape1N3': {'type': 'f', 'value': 2.5},
  // 'shape2A': {'type': 'f', 'value': 0.8},
  // 'shape2B': {'type': 'f', 'value': 0.5},
  // 'shape2M': {'type': 'f', 'value': 25},
  // 'shape2N1': {'type': 'f', 'value': 3.3},
  // 'shape2N2': {'type': 'f', 'value': 1.5},
  // 'shape2N3': {'type': 'f', 'value': 0.8},
  // 'brightColor': {'type': 'c', 'value': new THREE.Color('#d59d01')},
  // 'darkColor': {'type': 'c', 'value': new THREE.Color('#7f140b')},
})


animate();
