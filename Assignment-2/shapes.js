
let gl = undefined;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);

    //Creating MatrixStack and 3 objects
    let ms = new MatrixStack();
    let axes = new Axes(gl);
    let cone = new Cone(gl, 20);     
    let sphere = new Sphere(gl, 30, 21);
    let angle = 0.0;

    function render() {
        // Add rendering code here
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        angle += 3.0;
        angle %= 360.0;
    
        //Apply transformations to the shapes
            ms.push(); 
            ms.scale(.50,.25,.50);
            ms.rotate(angle, [0, 1, 0]); 
            axes.MV = ms.current(); 
            axes.color = vec4(0.0, 0.0, 1.0, 1.0)
            axes.draw(); 
            ms.pop();
    
            ms.push();
            ms.scale(.25,.25,.50);
            ms.translate(-0.5, 0.5, 0.0);  
            ms.rotate(angle, [0, 1, 0]); 
            cone.MV = ms.current();
            cone.color = vec4(1.0, 0.75, 0.8, 1.0);
            cone.draw();
            ms.pop();
    
            ms.push();
            ms.translate(0.5, -0.5, 0.0);  
            ms.rotate(angle, [1, 1, 0]);  
            ms.scale(0.5, 0.5, 0.5); 
            sphere.MV = ms.current();
            sphere.color = vec4(1.0, 0.0, 0.0, 1.0);
            sphere.draw();
            ms.pop();
    
            requestAnimationFrame(render);
    }
    
    render();
}

window.onload = init;

