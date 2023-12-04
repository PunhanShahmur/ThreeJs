import * as THREE from 'https://threejs.org/build/three.module.js';

let scene;
let camera;
let camera2;
let renderer;
let spotlight;
let directionalLight;
let pointLight;
let ambientLight;
let aoi;
let disp;

function createScene() {
//Sehne yaratmaq
    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xffffff) //sehne backgroundu
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000); 
    camera.position.x = 5; 
    camera.position.y = 5;
    camera.position.z = 5;
    //Camera duz obyekte baxmaq
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //camera2 = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 20);
    //camera2.position.x = 0.5;
    //camera2.position.y = 1;
    //camera2.position.z = 2;
    //Camera duz obyekte baxmaq
    //camera2.lookAt(new THREE.Vector3(0, 0, 0));




    renderer = new THREE.WebGLRenderer({ physicallyCorrectLights: true, antialias: true, powerPrefence: 'high-performance'});
    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);



    //Helpers
    //let gridHelper = new THREE.GridHelper(3, 10, 0xff0000, 0xffffff);
    //scene.add(gridHelper)

    //let axesHelper = new THREE.AxesHelper(1);
    //scene.add(axesHelper)

    //let dir = new THREE.Vector3(1, 4, 5);
    //let ori = new THREE.Vector3(0, 0, 0);

    //let arrowHelper = new THREE.ArrowHelper(dir.normalize(), ori, 1, 0x0000ff)
    //scene.add(arrowHelper)

    //let sh = new THREE.SpotLightHelper(spotlight)
    //scene.add(sh)

    //let cameraHelper = new THREE.CameraHelper(spotlight.shadow.camera)
    //scene.add(cameraHelper)



    ambientLight = new THREE.AmbientLight(0x404040, 1)
    scene.add(ambientLight)
    


    createMesh('square', 1, 2, 2, 1, 2, 2, 'wood');
    createMesh('square2', 60, 2, 60,0,0,0, 'rock');
    //createSpotLight()
    //createDirectionalLight()
    createPointLight()

    let plh = new THREE.PointLightHelper(pointLight, 1);
    scene.add(plh)
    console.log(plh.matrixWorld)
    render();

}

function createMesh(name,w,h,d,x,y,z,texture) {

    let geometry = new THREE.BoxGeometry(w, h, d, 100, 100, 100);
    let material = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });

    let loader = new THREE.TextureLoader();
    material.map = loader.load('../textures/' + texture + '.jpg')
    material.aoMap = loader.load('../textures/' + texture + '_ao.jpg')
    material.normalMap = loader.load('../textures/' + texture + '_normal.jpg') //isiq sacmagi ucun
    material.roughnessMap = loader.load('../textures/' + texture + '_rough.jpg') //isiq cox dusen yerleri cox parlaq olur onlari azalmaq ucun
    material.metalnessMap = loader.load('../textures/' + texture + '_metal.jpg') //metallasdirmaq ucun
    //material.displacementMap = loader.load('../textures/' + texture + '_disp.jpg') //qabartmaq ucun
    //material.displacementBias = 0 // Displacement edib qabardandan sora uzler ayrilir birlesdirmek ucun BIAS
    //material.displacementScale = 0


    //Bu cox onemli olan texture-un tekrar tekrar olmasi ucun her map-e verilmelidir
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat = new THREE.Vector2(5, 5); // x ve y kimi basa dus ama ratio-nu her texture-a gore tutmaq lazimdir

    material.aoMap.wrapS = THREE.RepeatWrapping;
    material.aoMap.wrapT = THREE.RepeatWrapping;
    material.aoMap.repeat = new THREE.Vector2(5, 5);

    material.normalMap.wrapS = THREE.RepeatWrapping;
    material.normalMap.wrapT = THREE.RepeatWrapping;
    material.normalMap.repeat = new THREE.Vector2(5, 5);

    material.roughnessMap.wrapS = THREE.RepeatWrapping;
    material.roughnessMap.wrapT = THREE.RepeatWrapping;
    material.roughnessMap.repeat = new THREE.Vector2(5, 5);

    material.metalnessMap.wrapS = THREE.RepeatWrapping;
    material.metalnessMap.wrapT = THREE.RepeatWrapping;
    material.metalnessMap.repeat = new THREE.Vector2(5, 5);
    



    //material.emissive = new THREE.Color(0xff0000) default qara
    material.transparent = true
    //material.opacity = 0.5 

    //Ambient O intensity GUI

    aoi.add(parameters, 'value', 0, 1).step(0.01).onChange(value => {
        material.aoMap.intensity = value
    });

    //Dispacement GUI

    disp.add(parameters, 'value', 0, 1).step(0.01).onChange(value => {
        material.displacementScale = value
    });


    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(x, y, z)
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
}


function render() {
    renderer.render(scene, camera);
    scene.getObjectByName('square').rotation.z += 0.01;

    //Tekrar tekrar render olmasi ucun
    requestAnimationFrame(render);
}


function createSpotLight() {
    spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(2, 4, 3);
    spotlight.castShadow = true;

    let target = new THREE.Object3D();
    target.position.set(0, 0, 0);
    spotlight.target = target;

    spotlight.shadow.mapSize.width = 4096;
    spotlight.shadow.mapSize.height = 4096;
    scene.add(spotlight)
    scene.add(target);
}


function createDirectionalLight() {
    directionalLight = new THREE.SpotLight(0xffffff);
    directionalLight.position.set(3, 6, 3);
    directionalLight.castShadow = true;
    directionalLight.intensity = 20

    let target = new THREE.Object3D();
    target.position.set(0, 0, 0);
    directionalLight.target = target;

    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    scene.add(directionalLight)
    scene.add(target);
}

function createPointLight() {
    pointLight = new THREE.SpotLight(0xffffff);
    pointLight.position.set(3, 6, 3);
    pointLight.castShadow = true;
    pointLight.intensity = 20

    pointLight.shadow.mapSize.width = 4096;
    pointLight.shadow.mapSize.height = 4096;
    scene.add(pointLight)
}


//GUI
    let gui = new dat.GUI();
    let parameters = {
        color: '#00ff00',
        value: 0,
        x: 0,
        y: 0,
        z: 0
        //toggle: true
    };


    let c = gui.addFolder('Camera')

    let fp = gui.addFolder('Position')
    let fr = gui.addFolder('Rotation')
    let fc = gui.addFolder('Color')
    //let sl = gui.addFolder('SpotLight')
    //let spt = gui.addFolder('SpotLight Target')
    //let dl = gui.addFolder('Directional Light')
    //let dlt = gui.addFolder('Directional Light Target')
    let pl = gui.addFolder('Point Light')
    let al = gui.addFolder('Ambient Light')
    aoi = gui.addFolder('AO intensity Map')
    disp = gui.addFolder('Displacement Map')



    c.add(parameters, 'value', -100, 100).step(0.01).onChange(value => {

        camera.position.x = value
    });

    c.add(parameters, 'value', -100, 100).step(0.01).onChange(value => {

        camera.position.y = value
    });

    c.add(parameters, 'value', -100, 100).step(0.01).onChange(value => {

        camera.position.z = value
    });


    fc.addColor(parameters, 'color').onChange(value => {
        scene.getObjectByName('square').material.color.set(value)
    });

    fp.add(parameters, 'value', -10, 10).step(0.1).onChange(value => {

        scene.getObjectByName('square').position.x = value
    });

    fp.add(parameters, 'value', -10, 10).step(0.1).onChange(value => {

        scene.getObjectByName('square').position.y = value
    });

    fp.add(parameters, 'value', -10, 10).step(0.1).onChange(value => {

        scene.getObjectByName('square').position.z = value
    });


    fr.add(parameters, 'value', -10, 10).step(0.1).onChange(value => {

        scene.getObjectByName('square').rotation.x = value
    });

    fr.add(parameters, 'value', -10, 10).step(0.1).onChange(value => {

        scene.getObjectByName('square').rotation.y = value
    });

    fr.add(parameters, 'value', -10, 10).step(0.1).onChange(value => {

        scene.getObjectByName('square').rotation.z = value
    });


    //SpotLight GUI

    //sl.add(parameters, 'value', 0, 1).step(0.01).onChange(value => {
    //    spotlight.penumbra = value
    //});

    //sl.add(parameters, 'value', 0, 10).step(0.01).onChange(value => {
    //    spotlight.intensity = value
    //});
    //sl.add(parameters, 'value', 0, 10).step(0.01).onChange(value => {
    //    spotlight.distance = value
    //});
    //sl.add(parameters, 'value', 0, 10).step(0.01).onChange(value => {
    //    spotlight.decay = value
    //});
    //sl.add(parameters, 'value', 0, 10).step(0.01).onChange(value => {
    //    spotlight.power = value
    //});


    //sl.add(parameters, 'x', 0, 10).step(0.01).onChange(value => {
    //    spotlight.position.x = value
    //});
    //sl.add(parameters, 'y', 0, 10).step(0.01).onChange(value => {
    //    spotlight.position.y = value
    //});
    //sl.add(parameters, 'z', 0, 10).step(0.01).onChange(value => {
    //    spotlight.position.z = value
    //});

    //spt.add(parameters, 'x', 0, 10).step(0.01).onChange(value => {
    //    spotlight.target.position.x = value
    //});
    //spt.add(parameters, 'y', 0, 10).step(0.01).onChange(value => {
    //    spotlight.target.position.y = value
    //});
    //spt.add(parameters, 'z', 0, 10).step(0.01).onChange(value => {
    //    spotlight.target.position.z = value
    //});


    //Directional Light GUI

    //dl.add(parameters, 'x', 0, 100).step(0.01).onChange(value => {
    //    directionalLight.position.x = value
    //});
    //dl.add(parameters, 'y', 0, 100).step(0.01).onChange(value => {
    //    directionalLight.position.y = value
    //});
    //dl.add(parameters, 'z', 0, 100).step(0.01).onChange(value => {
    //    directionalLight.position.z = value
    //});

    //dlt.add(parameters, 'x', 0, 100).step(0.01).onChange(value => {
    //    directionalLight.target.x = value
    //});
    //dlt.add(parameters, 'y', 0, 100).step(0.01).onChange(value => {
    //    directionalLight.target.y = value
    //});
    //dlt.add(parameters, 'z', 0, 100).step(0.01).onChange(value => {
    //    directionalLight.target.z = value
    //});


    //Point Light GUI

    pl.add(parameters, 'x', 0, 100).step(0.01).onChange(value => {
        pointLight.position.x = value
    });
    pl.add(parameters, 'y', 0, 100).step(0.01).onChange(value => {
        pointLight.position.y = value
    });
    pl.add(parameters, 'z', 0, 100).step(0.01).onChange(value => {
        pointLight.position.z = value
    });


    //Ambient Light GUI

    al.add(parameters, 'value', 0, 100).step(0.01).onChange(value => {
        ambientLight.intensity = value
    });



    //fp.add(parameters, 'toggle').onChange(value => {

    //});





createScene()











