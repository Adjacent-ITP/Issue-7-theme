let activateBlob = () => {

  /* ===================== DOM ELEMENTS ================== */

  let $DOM = {
    next: document.querySelector(".nav__btn.-right"),
    prev: document.querySelector(".nav__btn.-left"),
    wrapper: document.querySelector('.content-area__main'),
    scroller: document.querySelector('.posts')
  };

  /* ===================== DOM ELEMENTS ================== */




  /* ========================= COLORS ====================== */

  let colors = [
    [ (new THREE.Vector3(211, 215, 126)),   (new THREE.Vector3(123, 174, 204)) ],
    [ (new THREE.Vector3(182, 153, 233)),   (new THREE.Vector3(158, 191, 230)) ],
    [ (new THREE.Vector3(75, 99, 184)),     (new THREE.Vector3(249, 172, 172)) ],
    [ (new THREE.Vector3(129, 181, 205)),   (new THREE.Vector3(240, 135, 85))  ],
    [ (new THREE.Vector3(255, 187, 221)),   (new THREE.Vector3(249, 242, 235)) ],
    [ (new THREE.Vector3(255, 213, 40)),    (new THREE.Vector3(227, 196, 222)) ],
    [ (new THREE.Vector3(198, 237, 233)),   (new THREE.Vector3(245, 230, 188)) ],
    [ (new THREE.Vector3(166, 54, 132)),    (new THREE.Vector3(173, 168, 196)) ],
    [ (new THREE.Vector3(84, 51, 103)),     (new THREE.Vector3(240, 115, 115)) ],
    [ (new THREE.Vector3(255, 230, 139)),   (new THREE.Vector3(197, 213, 172)) ],
    [ (new THREE.Vector3(121, 114, 12)),    (new THREE.Vector3(213, 180, 110)) ],
    [ (new THREE.Vector3(255, 167, 157)),   (new THREE.Vector3(112, 119, 104)) ]
  ]

  let colorstops = colors.length-1;
  let color1 = new THREE.Color();
  let color2 = new THREE.Color();

  /* ========================= COLORS ====================== */



  /* ========================= SHAPES ====================== */

  let shapes = [
    [
      (new THREE.Vector3(1, 1, 0)),
      (new THREE.Vector3(2, 4, 2)),
      (new THREE.Vector3(1, 1, 0)),
      (new THREE.Vector3(2, 4, 2))
    ],
    [
      (new THREE.Vector3(1.2, 0.3, 5)),
      (new THREE.Vector3(3, 2.6, 1.8)),
      (new THREE.Vector3(1.4, 1.6, 40)),
      (new THREE.Vector3(2.9, 6.7, 2))
    ],
    [
      (new THREE.Vector3(0.6,0.1,0)),
      (new THREE.Vector3(1.3,2.6,4.4)),
      (new THREE.Vector3(0.6,1.6,47)),
      (new THREE.Vector3(2,4,2))
    ],
    [
      (new THREE.Vector3(0.6,0.7,23)),
      (new THREE.Vector3(2,2.9,4.4)),
      (new THREE.Vector3(1.4,1,10)),
      (new THREE.Vector3(1.4,1.9,2))
    ],
    [
      (new THREE.Vector3(.9,.4,14)),
      (new THREE.Vector3(2.1,2.7,1.8)),
      (new THREE.Vector3(1,1.9,1)),
      (new THREE.Vector3(3.6,2.4,2.6))
    ],
    [
      (new THREE.Vector3(.5, .6, 0)),
      (new THREE.Vector3(3.8, 3.2, 5.1)),
      (new THREE.Vector3(.7, 1.5, 10)),
      (new THREE.Vector3(2.9,1.7,7.1))
    ],
    [
      (new THREE.Vector3(.7, .2, 12)),
      (new THREE.Vector3(.9,1.7,7.5)),
      (new THREE.Vector3(1.3,0.9,19)),
      (new THREE.Vector3(1.1,2.5,7.1))
    ],
    [
      (new THREE.Vector3(1.6,0.4,31)),
      (new THREE.Vector3(3.4,1.2,5.6)),
      (new THREE.Vector3(1.5,0.4,53)),
      (new THREE.Vector3(3.1,4.6,4.7))
    ],
    [
      (new THREE.Vector3(1.4,0.4,6)),
      (new THREE.Vector3(2.4,6.8,6.9)),
      (new THREE.Vector3(0.6,1,4)),
      (new THREE.Vector3(2.3,3.3,4.1))
    ]
  ]

  let shapestops = shapes.length-1;
  let shape = {
    p1: new THREE.Vector3(),
    p2: new THREE.Vector3(),
    p3: new THREE.Vector3(),
    p4: new THREE.Vector3(),
  };

  /* ========================= SHAPES ====================== */



  /* ========================= SETUP ====================== */

  let currentPost = 0;

  let startTime = Date.now();
  let raycaster = new THREE.Raycaster();
  let prevMouse = new THREE.Vector2(0,0);
  let mouse = new THREE.Vector2(0,0);
  let deadMouse = new THREE.Vector3(1000.,1000.,1000.);

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  let renderer = new THREE.WebGLRenderer({ alpha: true });
  let camPosInit = new THREE.Vector3(0,0,50);
  let blobRotInit = new THREE.Vector3(0,0,0);


  /* ========================= SETUP ====================== */




  /* ======================= FUNCTIONS ==================== */

  let setSpace = () => {
    $DOM.wrapperDims = $DOM.wrapper.getBoundingClientRect();
    $DOM.scrollerHeight = $DOM.scroller.scrollHeight - $DOM.scroller.getBoundingClientRect().height;
    camera.aspect = $DOM.wrapperDims.width / $DOM.wrapperDims.height;
    camera.updateProjectionMatrix();
    renderer.setSize( $DOM.wrapperDims.width, $DOM.wrapperDims.height );
  }

  let setColors = (index1, index2, lerpAmt) => {
    let v1 = new THREE.Vector3();
    let v2 = new THREE.Vector3();
    v1.subVectors( colors[index2][0], colors[index1][0] ).multiplyScalar( lerpAmt ).add( colors[index1][0] );
    v2.subVectors( colors[index2][1], colors[index1][1] ).multiplyScalar( lerpAmt ).add( colors[index1][1] );
    color1.setRGB(v1.x/255, v1.y/255, v1.z/255);
    color2.setRGB(v2.x/255, v2.y/255, v2.z/255);
  }

  let setShapes = (index1, index2, lerpAmt) => {
    for(let i=0; i<4; i++) {
      let v1 = new THREE.Vector3();
      v1.subVectors( shapes[index2][i], shapes[index1][i] ).multiplyScalar( lerpAmt ).add( shapes[index1][i] );
      shape[`p${i+1}`].copy(v1);
    }
  }

  let scrollTransition = (t, stops, fn) =>  {
    let lerpAmt = t*(stops);
    let index1 = Math.floor(lerpAmt);
    let index2 = Math.min(index1+1, stops);
    lerpAmt = lerpAmt - index1;
    fn(index1, index2, lerpAmt);
  }

  let animate = (  ) => {
    requestAnimationFrame( animate );
    uniforms.time.value = (Date.now() - startTime) / 1000.;
    renderer.render( scene, camera );
  };

  let init = () => {
    renderer.domElement.classList = "blob";
    $DOM.wrapper.appendChild( renderer.domElement );
    camera.position.copy(camPosInit);
    setSpace();
    setColors(0,1,0);
    setShapes(0,1,0);
    scene.add( object );
    animate();
  }

  /* ======================= FUNCTIONS ==================== */



  /* ========================= SCENE ====================== */

  let uniforms = {
    "time": { value: 1.0 },
    "scroll": { value: 1.0 },
    'mouse': {'type': 'v2', 'value': mouse},
    'mouseCast': {'type': 'v3', 'value': deadMouse},
    'brightColor': {'type': 'c', 'value': color1},
    'darkColor': {'type': 'c', 'value': color2},
    'shape1': {'type': 'v3', 'value': shape.p1},
    'shape2': {'type': 'v3', 'value': shape.p2},
    'shape3': {'type': 'v3', 'value': shape.p3},
    'shape4': {'type': 'v3', 'value': shape.p4},
  };

  let material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });

  let geometry = new THREE.SphereGeometry( 15, 32, 32 );
  let object = new THREE.Mesh(geometry, material);


  /* ========================= SCENE ====================== */




  /* ========================= EVENTS ====================== */

  window.addEventListener("resize", setSpace);

  $DOM.scroller.addEventListener("scroll", () => {
    let t = Math.min($DOM.scroller.scrollTop / $DOM.scrollerHeight, 0.999);
    document.body.style.backgroundPositionY = `${t*100}%`;

    scrollTransition(t, colorstops, setColors);
    scrollTransition(t, shapestops, setShapes);
  })

  /* ========================= EVENTS ====================== */

  init();

}
