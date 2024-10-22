/////////////////////////////////////////////////////////////////////////////
//
//  ExperimentalCube.js
//
//  A cube defined ???
//

class ExperimentalCube {
    constructor(gl) {
        const vertexShader = `
            uniform mat4 P; 
            uniform mat4 MV; 

            out vec4 vColor;

            vec3 positions[8] = vec3[8](
                vec3(-0.5, -0.5,  0.5),  // Vertex 0
                vec3( 0.5, -0.5,  0.5),  // Vertex 1
                vec3( 0.5,  0.5,  0.5),  // Vertex 2
                vec3(-0.5,  0.5,  0.5),  // Vertex 3
                vec3(-0.5, -0.5, -0.5),  // Vertex 4
                vec3( 0.5, -0.5, -0.5),  // Vertex 5
                vec3( 0.5,  0.5, -0.5),  // Vertex 6
                vec3(-0.5,  0.5, -0.5)   // Vertex 7
            );

            void main() {
       
                vec3 position = positions[gl_VertexID % 8];
                
                gl_Position = P * MV * vec4(position, 1.0);

                //Color based on instance ID
                if (gl_InstanceID % 2 == 0) {
                    vColor = vec4(1.0, 0.0, 1.0, 1.0); // Pink
                } else {
                    vColor = vec4(0.0, 0.0, 1.0, 1.0); // Blue 
                }
            }
        `;

        const fragmentShader = `
            in vec4 vColor; 
            out vec4 fColor; 

            void main() {
                fColor = vColor; 
            }
        `;

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);


        const indices = new Uint16Array([
            // Front
            0, 1, 2, 0, 2, 3,
            // Back
            4, 5, 6, 4, 6, 7,
            // Left
            0, 4, 7, 0, 7, 3,
            // Right
            1, 5, 6, 1, 6, 2,
            // Top
            3, 2, 6, 3, 6, 7,
            // Bottom
            0, 1, 5, 0, 5, 4
        ]);

        // Create the index buffer
        let indicesBuffer = new Indices(gl, indices);

        this.draw = () => {
            program.use();

            // Enable the indices
            indicesBuffer.enable();

            // Draw the cube
            gl.drawElementsInstanced(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0, 2);

            // Disable the indices
            indicesBuffer.disable();
        };
    }
}
