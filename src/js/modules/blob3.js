let activateBlob = () => {

  /* ===================== DOM ELEMENTS ================== */

  let $DOM = {
    next: document.querySelector(".nav__btn.-right"),
    prev: document.querySelector(".nav__btn.-left"),
    wrapper: document.querySelector('.content-area__main'),
    scroller: document.querySelector('.posts'),
    posts: document.querySelectorAll('.posts__item')
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
    [ (new THREE.Vector3(112, 119, 104)),   (new THREE.Vector3(255, 167, 157)) ]
  ]

  let colorstops = colors.length-1;
  let color1 = new THREE.Color();
  let color2 = new THREE.Color();

  /* ========================= COLORS ====================== */



  /* ========================= SHAPES ====================== */

  let shapes = [
    [
      (new THREE.Vector3(6.59, 1.35, 1.35)),
      (new THREE.Vector3(-6, 1.35, 15)),
      (new THREE.Vector3(1.2, 3, .56)),
      (new THREE.Vector3(16, 53, 9))
    ],
    [
      (new THREE.Vector3(6.19, 1.35,1.35)),
      (new THREE.Vector3(-6,1.35,15)),
      (new THREE.Vector3(1,3,-2)),
      (new THREE.Vector3(17.1,53,9))
    ],
    [
      (new THREE.Vector3(6.19,1.35,1.35)),
      (new THREE.Vector3(-6,3.17,3.43)),
      (new THREE.Vector3(1,3,-4.4)),
      (new THREE.Vector3(16,53,9))
    ],
    [
      (new THREE.Vector3(6.19,1.35,1.35)),
      (new THREE.Vector3(-19.2,3.17,3.43)),
      (new THREE.Vector3(1,3,-4.4)),
      (new THREE.Vector3(16.9,53,0.63))
    ],
    [
      (new THREE.Vector3(6.19,1.35,1.35)),
      (new THREE.Vector3(-19.2,-3.4,3.43)),
      (new THREE.Vector3(1,2.03,-4)),
      (new THREE.Vector3(17.1,-16.4,3.25))
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
  let mouse = new THREE.Vector3(0,0,0);

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  let renderer = new THREE.WebGLRenderer({ alpha: true });
  let camPosInit = new THREE.Vector3(0,0,40);
  let blobRotInit = new THREE.Vector3(0,100,10);
  // camera.position.x = camPosInit.x + (1.5)*Math.sin(0);

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

  let calculateMouse = (mx, my) => {
    let x = mx - $DOM.wrapperDims.x;
    let y = my - $DOM.wrapperDims.y;
    x = (x / $DOM.wrapperDims.width) * 2 - 1;
    y = -(y / $DOM.wrapperDims.height) * 2 + 1;

    var vec = new THREE.Vector3();
    var pos = new THREE.Vector3();
    vec.set(x,y,1);
    vec.unproject( camera );
    vec.sub( camera.position ).normalize();
    var distance = - camera.position.z / vec.z;
    pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );

    uniforms.mouse.value = pos;
  }

  let prevPost = () => {
    let found = false;
    for(let i=$DOM.posts.length-1; i>=0; i--) {
      let dims = $DOM.posts[i].getBoundingClientRect();
      if( ($DOM.wrapperDims.y - dims.y) > 1) {
        $DOM.posts[i].scrollIntoView();
        found = true;
        break;
      }
    }
    if(!found) { $DOM.posts[$DOM.posts.length-1].scrollIntoView(); }
  }

  let nextPost = () => {
    if(Math.abs($DOM.scroller.scrollTop-$DOM.scrollerHeight) < 1) {
      $DOM.posts[0].scrollIntoView();
    } else {
      let found = false;
      for(let i=0; i<$DOM.posts.length; i++) {
        let dims = $DOM.posts[i].getBoundingClientRect();
        if((dims.y - $DOM.wrapperDims.y) > 1) {
          $DOM.posts[i].scrollIntoView();
          found = true;
          console.log();
          break;
        }
      }
      if(!found) {$DOM.posts[0].scrollIntoView();}
    }
  }

  let animate = (  ) => {
    requestAnimationFrame( animate );
    // uniforms.mouse.value = mouse;
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
    calculateMouse(0,0);
    scene.add( object );
    animate();
  }

  /* ======================= FUNCTIONS ==================== */



  /* ========================= SCENE ====================== */

  let uniforms = {
    "time": { value: 1.0 },
    "scroll": { value: 1.0 },
    "camera": { 'type': 'v3', 'value': camera.position },
    'mouse': {'type': 'v3', 'value': mouse},
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

  let geometry = new THREE.SphereGeometry( 15, 128, 128 );
  let object = new THREE.Mesh(geometry, material);
  // object.rotation.copy(blobRotInit);

  /* ========================= SCENE ====================== */




  /* ========================= EVENTS ====================== */

  window.addEventListener("resize", setSpace);

  $DOM.wrapper.addEventListener("mousemove", (event) => {
    calculateMouse(event.clientX, event.clientY)
  }, false)

  $DOM.scroller.addEventListener("scroll", () => {
    let t = Math.min($DOM.scroller.scrollTop / $DOM.scrollerHeight, 0.999);
    document.body.style.backgroundPositionY = `${t*100}%`;

    object.rotation.y = t*5;
    object.rotation.x = t*5;

    // camPos.x = camPosInit.x + Math.sin(t*30);
    camera.position.x = camPosInit.x + (1.5)*Math.sin(t*20);
    camera.updateProjectionMatrix();

    scrollTransition(t, colorstops, setColors);
    scrollTransition(t, shapestops, setShapes);
  });

  $DOM.next.addEventListener('click', nextPost);
  $DOM.prev.addEventListener('click', prevPost);

  /* ========================= EVENTS ====================== */

  init();

}
