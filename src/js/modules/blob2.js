let activateBlob2 = () => {


  let $area = document.querySelector('.content-area__main');
  let $areaBounds = $area.getBoundingClientRect();

  let $scroller = document.querySelector('.posts');
  let $scrollerHeight = $scroller.scrollHeight - $scroller.getBoundingClientRect().height;

  let COLOR_1 = new THREE.Color("rgb(213, 157, 1)");
  let COLOR_2 = new THREE.Color('rgb(127, 20, 11)');
  let COLOR_3 = new THREE.Color('rgb(0,0,0)');


  let loader = new THREE.OBJLoader();
  let scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff);
  let camera = new THREE.PerspectiveCamera(75, $areaBounds.width/$areaBounds.height, 0.1, 1000);
  camera.position.z = 20;
  camera.aspect = $areaBounds.width / $areaBounds.height;
  camera.updateProjectionMatrix();

  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( $areaBounds.width, $areaBounds.height );
  renderer.domElement.classList = "blob";
  $area.appendChild( renderer.domElement );


  let doTheStuff = (object) => {
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2(0,0);
    let deadMouse = new THREE.Vector3(1000.,1000.,1000.);

    let uniforms = {
          "time": { value: 1.0 },
          'shape2A': {'type': 'f', 'value': 0.8},
          'shape2B': {'type': 'f', 'value': 1},
          'shape2M': {'type': 'f', 'value': 14},
          'shape2N1': {'type': 'f', 'value': 2.4},
          'shape2N2': {'type': 'f', 'value': 4},
          'shape2N3': {'type': 'f', 'value': 2.5},
          'shape1A': {'type': 'f', 'value': 0.8},
          'shape1B': {'type': 'f', 'value': 0.5},
          'shape1M': {'type': 'f', 'value': 25},
          'shape1N1': {'type': 'f', 'value': 3.3},
          'shape1N2': {'type': 'f', 'value': 1.5},
          'shape1N3': {'type': 'f', 'value': 0.8},
          'mouse': {'type': 'v2', 'value': mouse},
          'mouseCast': {'type': 'v3', 'value': deadMouse},
          'depthBasedShading': {'type': 'i', 'value': 0},
          'lightPosition': {'type': 'v3', 'value': new THREE.Vector3(0.0, 0.0, 40.0)},
          'brightColor': {'type': 'c', 'value': COLOR_1},
          'darkColor': {'type': 'c', 'value': COLOR_2},
          'minColorDistance': {'type': 'f', 'value': 0.0},
          'maxColorDistance': {'type': 'f', 'value': 15.75},
          // 'lightIntensity': {'type': 'f', 'value': 0.14},
          'lightIntensity': {'type': 'f', 'value': .5},
          'ambientLightIntensity': {'type': 'f', 'value': 0.0},
          'brightnessMultiplier': {'type': 'f', 'value': .6}
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
    object.position.z = -20;
    object.scale.x = 2;
    object.scale.y = 2;
    object.scale.z = 2;
    scene.add( object );

    let animate = ( timestamp ) => {
      requestAnimationFrame( animate );
      raycaster.setFromCamera( mouse, camera );
      var intersect = raycaster.intersectObject( object , true);

      if(intersect.length > 0) {
        // console.log(intersect[0].point);
        uniforms[ "mouseCast" ].value = intersect[0].point;
      } else {
        uniforms[ "mouseCast" ].value = deadMouse;
      }

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
      let t = $scroller.scrollTop / $scrollerHeight;
      object.rotation.y = t*4;
      uniforms[ "time" ].value = t*6;
      uniforms['brightColor'].value.b = Math.sin(10+t*10)*0.3+0.3;
      uniforms['brightColor'].value.r = Math.cos(1099+t*10)*0.3+0.3;
      uniforms['brightColor'].value.g = Math.cos(99+t*10)*0.99+0.99;

      uniforms['darkColor'].value.b = Math.sin(100000+t*10)*0.3+0.3;

      uniforms['darkColor'].value.g = Math.sin(1200+t*10)*0.3+0.3;
    })


    animate();
  }

  loader.load(
    // resource URL
    '/wp-content/themes/Issue-7-theme/public/assets/glob/glob.obj',
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
