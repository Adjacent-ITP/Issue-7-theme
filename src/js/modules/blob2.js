let activateBlob = () => {

  let $area = document.querySelector('.content-area__main');
  let $areaBounds = $area.getBoundingClientRect();

  let $scroller = document.querySelector('.posts');
  let $scrollerHeight = $scroller.scrollHeight - $scroller.getBoundingClientRect().height;

  let BCOL = [
    (new THREE.Color('rgb(181, 208, 163)')),
    (new THREE.Color('rgb(196, 178, 228)')),
    (new THREE.Color('rgb(91, 109, 173)')),
    (new THREE.Color('rgb(188, 169, 199)')),
    (new THREE.Color('rgb(151, 176, 180)')),
    (new THREE.Color('rgb(182, 207, 215)')),
    (new THREE.Color('rgb(229, 218, 216)')),
    (new THREE.Color('rgb(252, 222, 152)')),
    (new THREE.Color('rgb(158, 79, 133)')),
    (new THREE.Color('rgb(92, 67, 106)')),
    (new THREE.Color('rgb(252, 230, 138)'))
  ]

  let DCOL = [
    (new THREE.Color('rgb(170, 197, 216)')),
    (new THREE.Color('rgb(171, 188, 242)')),
    (new THREE.Color('rgb(117, 103, 173)')),
    (new THREE.Color('rgb(245, 189, 190)')),
    (new THREE.Color('rgb(238, 150, 104)')),
    (new THREE.Color('rgb(241, 196, 219)')),
    (new THREE.Color('rgb(251, 213, 40)')),
    (new THREE.Color('rgb(209, 234, 231)')),
    (new THREE.Color('rgb(184, 77, 145)')),
    (new THREE.Color('rgb(210, 120, 119)')),
    (new THREE.Color('rgb(196, 210, 177)'))
  ]

  let COLORSTOPS = BCOL.length;
  let COL1 = BCOL[0];
  let COL2 = DCOL[0];

  let loader = new THREE.OBJLoader();
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, $areaBounds.width/$areaBounds.height, 0.1, 1000);
  camera.position.z = 20;
  camera.aspect = $areaBounds.width / $areaBounds.height;
  camera.updateProjectionMatrix();

  let renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize( $areaBounds.width, $areaBounds.height );
  renderer.domElement.classList = "blob";
  $area.appendChild( renderer.domElement );


  let doTheStuff = (object) => {

    var startTime = Date.now();
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
    };

    let material = new THREE.ShaderMaterial( {
    	uniforms: uniforms,
    	vertexShader: document.getElementById( 'vertexShader' ).textContent,
    	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    });

    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.geometry = new THREE.Geometry().fromBufferGeometry( child.geometry );
        child.geometry.mergeVertices();
        child.material = material;
        child.verticesNeedUpdate = true;
        child.normalsNeedUpdate = true;
        child.uvsNeedUpdate = true;
        child.geometry.computeVertexNormals();
      }
    })
    object.rotation.x = -0.8;
    // object.rotation.z = 0.7;
    object.rotation.y = -0.6;
    object.scale.x = 2.2;
    object.scale.y = 2.2;
    object.scale.z = 2.2;
    object.position.z = -20;
    scene.add( object );

    $scroller.addEventListener('scroll', () => {
      let t = $scroller.scrollTop / $scrollerHeight;
      document.body.style.backgroundPositionY = `${t*100}%`;
      object.rotation.y = t*20;
      camera.position.z = 14+8*Math.sin(t*3);
      camera.position.y = 3*Math.sin(t*2);
      camera.updateProjectionMatrix();


      let ct = t*COLORSTOPS;
      uniforms.scroll.value = ct;
      let ci = Math.floor(ct);

      ct = ct - ci;

      COL1.lerp(BCOL[ci], ct);
      COL2.lerp(DCOL[ci], ct);

    })

    let animate = (  ) => {
      requestAnimationFrame( animate );
      raycaster.setFromCamera( mouse, camera );
      var intersect = raycaster.intersectObject( object , true);

      if(intersect.length > 0) {
        // console.log(intersect[0]);
        uniforms.mouseCast.value = intersect[0].point;
      } else {
        uniforms.mouseCast.value = deadMouse;
      }
      uniforms.mouse.value = mouse;

      var elapsedMilliseconds = Date.now() - startTime;
      var elapsedSeconds = elapsedMilliseconds / 1000.;
      uniforms.time.value = 60. * elapsedSeconds;
      renderer.render( scene, camera );
    };


      $area.addEventListener("mousemove", (event) => {
        let x = event.clientX - $areaBounds.x;
        let y = event.clientY - $areaBounds.y;
        x = (x / $areaBounds.width) * 2 - 1;
        y = -(y / $areaBounds.height) * 2 + 1;

        mouse.x = 0.95*prevMouse.x + 0.05*x;
        mouse.y = 0.95*prevMouse.y + 0.05*y;
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

    animate();
  }


  let path = document.querySelector('.header__logo-img').src.replace("logo.svg", "glob/blobby.obj");

  loader.load(path,
    // called when resource is loaded
    function ( object ) {

      doTheStuff(object);

    },
    // called when loading is in progresses
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
      console.log( 'An error happened' );
    }
  );



}
