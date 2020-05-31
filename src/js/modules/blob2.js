let activateBlobOLD = () => {

  /* ===================== DOM ELEMENTS ================== */
  let $area = document.querySelector('.content-area__main');
  let $areaBounds = $area.getBoundingClientRect();
  let $scroller = document.querySelector('.posts');
  let $posts = document.querySelectorAll('.posts__item');
  let $scrollerHeight = $scroller.scrollHeight - $scroller.getBoundingClientRect().height;
  let $next = document.querySelector(".nav__btn.-right");
  let $prev = document.querySelector(".nav__btn.-left");



  /* ===================== INIT VALS ================== */
  let camPosInit = new THREE.Vector3(0,2.7,50);
  let blobRotInit = new THREE.Vector3(0,5.5,0);

  let BCOL = [
    (new THREE.Vector3(211, 215, 126)),
    (new THREE.Vector3(182, 153, 233)),
    (new THREE.Vector3(75, 99, 184)),
    (new THREE.Vector3(129, 181, 205)),
    (new THREE.Vector3(255, 187, 221)),
    (new THREE.Vector3(255, 213, 40)),
    (new THREE.Vector3(198, 237, 233)),
    (new THREE.Vector3(166, 54, 132)),
    (new THREE.Vector3(84, 51, 103)),
    (new THREE.Vector3(255, 230, 139)),
    (new THREE.Vector3(121, 114, 12)),
    (new THREE.Vector3(255, 167, 157))
  ]

  let DCOL = [
    (new THREE.Vector3(123, 174, 204)),
    (new THREE.Vector3(158, 191, 230)),
    (new THREE.Vector3(249, 172, 172)),
    (new THREE.Vector3(240, 135, 85)),
    (new THREE.Vector3(249, 242, 235)),
    (new THREE.Vector3(227, 196, 222)),
    (new THREE.Vector3(245, 230, 188)),
    (new THREE.Vector3(173, 168, 196)),
    (new THREE.Vector3(240, 115, 115)),
    (new THREE.Vector3(197, 213, 172)),
    (new THREE.Vector3(213, 180, 110)),
    (new THREE.Vector3(112, 119, 104))
  ]

  let CURRENT_POST = 0;
  let COLORSTOPS = BCOL.length;
  let BACTIVE = BCOL[0].clone();
  let DACTIVE = DCOL[0].clone();
  let COL1 = new THREE.Color(`rgb(${BACTIVE.x}, ${BACTIVE.y}, ${BACTIVE.z})`);
  let COL2 = new THREE.Color(`rgb(${DACTIVE.x}, ${DACTIVE.y}, ${DACTIVE.z})`);


  /* ======================= SCENE ==================== */
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, $areaBounds.width/$areaBounds.height, 0.1, 1000);
  camera.position.z = camPosInit.z;
  camera.position.y = camPosInit.y;
  camera.position.x = camPosInit.x;
  camera.aspect = $areaBounds.width / $areaBounds.height;
  camera.updateProjectionMatrix();

  let renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize( $areaBounds.width, $areaBounds.height );
  renderer.domElement.classList = "blob";
  $area.appendChild( renderer.domElement );


  let startTime = Date.now();
  let raycaster = new THREE.Raycaster();
  let prevMouse = new THREE.Vector2(0,0);
  let mouse = new THREE.Vector2(0,0);
  let deadMouse = new THREE.Vector3(1000.,1000.,1000.);

  let uniforms = {
    "time": { value: 1.0 },
    "scroll": { value: 1.0 },
    'mouse': {'type': 'v2', 'value': mouse},
    'mouseCast': {'type': 'v3', 'value': deadMouse},
    'brightColor': {'type': 'c', 'value': COL1},
    'darkColor': {'type': 'c', 'value': COL2},
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
    'shape2N3': {'type': 'f', 'value': 0.8}
  };

  let material = new THREE.ShaderMaterial( {
  	uniforms: uniforms,
  	vertexShader: document.getElementById( 'vertexShader' ).textContent,
  	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });

  let geometry = new THREE.SphereGeometry( 5, 32, 32 );
  let object = new THREE.Mesh(geometry, material);


  scene.add( object );



  /* ======================= EVENTS ==================== */
  let animate = (  ) => {
    requestAnimationFrame( animate );
    raycaster.setFromCamera( mouse, camera );
    var intersect = raycaster.intersectObject( object , true);

    if(intersect.length > 0) {
      uniforms.mouseCast.value = intersect[0].point;
    } else {
      uniforms.mouseCast.value = deadMouse;
    }
    uniforms.mouse.value = mouse;
    uniforms.brightColor.value = COL1;
    var elapsedMilliseconds = Date.now() - startTime;
    var elapsedSeconds = elapsedMilliseconds / 1000.;
    uniforms.time.value = 60. * elapsedSeconds;
    renderer.render( scene, camera );
  };


  let navigate = (dir) => {
    let c = CURRENT_POST+dir;
    if(c<0) {c = $posts.length-1}
    else if (c >= $posts.length) {c = 0}

    $posts[c].scrollIntoView();
    CURRENT_POST = c;
  }


  $scroller.addEventListener('scroll', () => {
    let t = Math.min($scroller.scrollTop / $scrollerHeight, 1);
    document.body.style.backgroundPositionY = `${t*100}%`;

    // object.rotation.y = blobRotInit.y + t*4;

    // camera.position.z = camPosInit.z + 8*Math.sin(t*3);
    // camera.position.y = camPosInit.y + 4*Math.sin(t*7);
    // camera.position.x = camPosInit.x + 6*Math.sin(t*9);

    camera.updateProjectionMatrix();
    let ct = t*(COLORSTOPS-1);
    let idx1 = Math.floor(ct);
    let idx2 = Math.min(idx1+1, COLORSTOPS-1);
    uniforms.scroll.value = ct;
    ct = ct - idx1;

    BACTIVE.subVectors( BCOL[idx2], BCOL[idx1] ).multiplyScalar( ct ).add( BCOL[idx1] );
    DACTIVE.subVectors( DCOL[idx2], DCOL[idx1] ).multiplyScalar( ct ).add( DCOL[idx1] );

    COL1.setRGB(BACTIVE.x/255, BACTIVE.y/255, BACTIVE.z/255);
    COL2.setRGB(DACTIVE.x/255, DACTIVE.y/255, DACTIVE.z/255);
    CURRENT_POST = idx1;;
  })


  $area.addEventListener("mousemove", (event) => {
    let x = event.clientX - $areaBounds.x;
    let y = event.clientY - $areaBounds.y;
    x = (x / $areaBounds.width) * 2 - 1;
    y = -(y / $areaBounds.height) * 2 + 1;

    mouse.x = 0.88*prevMouse.x + 0.12*x;
    mouse.y = 0.88*prevMouse.y + 0.12*y;
    prevMouse.x = mouse.x;
    prevMouse.y = mouse.y;
  }, false)


  $area.addEventListener("mouseup", (event) => {
    raycaster.setFromCamera( mouse, camera );
    var intersect = raycaster.intersectObject( object , true);

    if(intersect.length > 0) {
      console.log(intersect[0]);
    }
  }, false)


  window.addEventListener("resize", () => {
    $areaBounds = $area.getBoundingClientRect();
    camera.aspect = $areaBounds.width / $areaBounds.height;
    camera.updateProjectionMatrix();
    renderer.setSize( $areaBounds.width, $areaBounds.height );
  })


  $next.addEventListener('click', () => navigate(1));
  $prev.addEventListener('click', () => navigate(-1));



  animate();

}
