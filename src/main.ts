import { createProgram, initWebGL, getGLColor } from './utils';
import { Matrix4 } from './maff';

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_GlobalTranslateMatrix;
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_GlobalTranslateMatrix * u_ModelMatrix * a_Position;
  }
`;

// Fragment shader program
const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

const canvas = document.getElementById('webgl') as HTMLCanvasElement;
if (!canvas) {
  throw new Error('Failed to get canvas element');
}
const gl = initWebGL(canvas);
const program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);

function main() {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
main();


class Cube {
  m: Matrix4;
  color: number[];
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  vertices: Float32Array;
  vertexBuffer: WebGLBuffer;
  gl_pos: number;
  unit: number = 0.25;
  constructor(gl: WebGLRenderingContext, program: WebGLProgram, color?: number[]) {
    this.color = color || [255, 255, 255, 1];
    this.m = new Matrix4();
    this.gl = gl;
    this.program = program;
    this.vertices = new Float32Array(9);

    this.vertexBuffer = this.gl.createBuffer() as WebGLBuffer;
    if (!this.vertexBuffer) {
      console.log("Failed to create the buffer object");
    }
    this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);


    this.gl_pos = this.gl.getAttribLocation(program, "a_Position");

    if (this.gl_pos < 0) {
      console.error("Could not find aPosition ptr");
    }
  }

  drawFace() {
    this.gl.vertexAttribPointer(this.gl_pos, 3, gl.FLOAT, false, 0, 0);

    this.gl.enableVertexAttribArray(this.gl_pos);
    const uModelMatrixPtr = this.gl.getUniformLocation(program, "u_ModelMatrix");
    const aColorPtr = this.gl.getUniformLocation(program, "u_FragColor");

    //front face
    this.vertices = new Float32Array([
      0, 0, 0,  // Vertex 1 (X, Y, Z)
      0, 1, 0,  // Vertex 2 (X, Y, Z)
      1, 0, 0   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    let c = getGLColor(this.color);
    for (let i = 0; i < 4; i++) {
      c[i] *= 0.8
    }
    this.gl.uniform4fv(aColorPtr, c);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.vertices = new Float32Array([
      0, 1, 0,  // Vertex 1 (X, Y, Z)
      1, 1, 0,  // Vertex 2 (X, Y, Z)
      1, 0, 0   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    //back face
    this.vertices = new Float32Array([
      0, 0, 1,  // Vertex 1 (X, Y, Z)
      0, 1, 1,  // Vertex 2 (X, Y, Z)
      1, 0, 1   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.vertices = new Float32Array([
      0, 1, 1,  // Vertex 1 (X, Y, Z)
      1, 1, 1,  // Vertex 2 (X, Y, Z)
      1, 0, 1   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    //left face
    this.vertices = new Float32Array([
      0, 0, 0,  // Vertex 1 (X, Y, Z)
      0, 1, 0,  // Vertex 2 (X, Y, Z)
      0, 0, 1   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.vertices = new Float32Array([
      0, 1, 0,  // Vertex 1 (X, Y, Z)
      0, 1, 1,  // Vertex 2 (X, Y, Z)
      0, 0, 1   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    //right face
    this.vertices = new Float32Array([
      1, 0, 0,  // Vertex 1 (X, Y, Z)
      1, 1, 0,  // Vertex 2 (X, Y, Z)
      1, 0, 1   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.vertices = new Float32Array([
      1, 1, 0,  // Vertex 1 (X, Y, Z)
      1, 1, 1,  // Vertex 2 (X, Y, Z)
      1, 0, 1   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    //top face
    this.vertices = new Float32Array([
      0, 1, 0,  // Vertex 1 (X, Y, Z)
      0, 1, 1,  // Vertex 2 (X, Y, Z)
      1, 1, 0   // Vertex 3 (X, Y, Z)
    ]);
    c = getGLColor(this.color);
    this.gl.uniform4fv(aColorPtr, c);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.vertices = new Float32Array([
      0, 1, 1,  // Vertex 1 (X, Y, Z)
      1, 1, 1,  // Vertex 2 (X, Y, Z)
      1, 1, 0   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    //bottom face
    this.vertices = new Float32Array([
      0, 0, 0,  // Vertex 1 (X, Y, Z)
      0, 0, 1,  // Vertex 2 (X, Y, Z)
      1, 0, 0   // Vertex 3 (X, Y, Z)
    ]);
    c = getGLColor(this.color);
    for (let i = 0; i < 4; i++) {
      c[i] *= 0.5
    }
    this.gl.uniform4fv(aColorPtr, c);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.vertices = new Float32Array([
      0, 0, 1,  // Vertex 1 (X, Y, Z)
      1, 0, 1,  // Vertex 2 (X, Y, Z)
      1, 0, 0   // Vertex 3 (X, Y, Z)
    ]);
    this.gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.gl.uniformMatrix4fv(uModelMatrixPtr, false, this.m.elements);
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  draw() {
    this.drawFace();

  }
}

class Camera {
  m: Matrix4;
  lastX: number = 0;
  lastY: number = 0;
  angleX: number = 0;
  angleY: number = 0;
  angleZ: number = 0;
  constructor() {
    this.m = new Matrix4();
  }

  convertMouseToEventCoords(e: MouseEvent) {
    
    let x = e.clientX; // x coordinate of a mouse pointer
    let y = e.clientY; // y coordinate of a mouse pointer

    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2); // canvas dt 
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2); // canvas dt


    return ([x, y]);
  }
  rotateCamera(e: MouseEvent) {

    const [x, y] = this.convertMouseToEventCoords(e);

    this.m.setIdentity();
    this.angleY -= (x - this.lastX) * 120;
    this.angleX -= (y - this.lastY) * 120;

    this.m.rotate(-this.angleX, 1, 0, 0);
    this.m.rotate(this.angleY, 0, 1, 0);
    this.m.rotate(this.angleZ, 0, 0, 1);


    this.lastX = x;
    this.lastY = y;


  }
}

class Model {
  parts: Cube[];
  camera: Camera;
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  moving: boolean = false;
  constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.parts = [];
    this.camera = new Camera();
    this.gl = gl;
    this.program = program;
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, "u_GlobalRotateMatrix"), false, this.camera.m.elements);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, "u_GlobalTranslateMatrix"), false, new Matrix4().elements);
  }
  makeBody() {
    
    let color = [235, 206, 76, 1];
    let torso = new Cube(this.gl, this.program, color);
    torso.m.scale(0.3, 0.3, 0.5);
    torso.m.translate(-0.5, -0.5, -0.5);
    this.addPart(torso);

    color = [241, 203, 65, 1];
    let neck = new Cube(this.gl, this.program, color);
    neck.m.rotate(-25, 1, 0, 0);
    neck.m.scale(0.18, 0.8, 0.18);
    neck.m.translate(-0.5, 0, -1);
    this.addPart(neck);
    //tilt the neck forward

    color = [247, 196, 9, 1]
    let head = new Cube(this.gl, this.program, color);
    head.m.rotate(-10, 1,0,0)
    head.m.scale(0.2, 0.2, 0.3);
    head.m.translate(-0.5, 3.5, -2);
    this.addPart(head);

    color = [238, 155, 77, 1]
    let weird_mustache = new Cube(this.gl, this.program, color);
    weird_mustache.m.rotate(-10, 1,0,0)
    weird_mustache.m.scale(0.21, 0.21, 0.05);
    weird_mustache.m.translate(-0.5, 3.3, -13);
    this.addPart(weird_mustache);
    
    color = [255,255,255,1]
    let eye_left = new Cube(this.gl, this.program, color);
    eye_left.m.scale(0.05, 0.05, 0.05);
    eye_left.m.translate(2, 15, -12);
    eye_left.m.rotate(-10, 1,0,0)
    
    this.addPart(eye_left);
    
    color = [1,1,1,1]
    let pupil_left = new Cube(this.gl, this.program, color);
    pupil_left.m.scale(0.05, 0.05, 0.05);
    pupil_left.m.translate(2, 15, -13);
    pupil_left.m.scale(0.5, 0.5, 0.5);
    pupil_left.m.translate(0,0, 1.5);
    pupil_left.m.rotate(-10, 1,0,0)
    this.addPart(pupil_left);

    color = [255,255,255,1]
    let eye_right = new Cube(this.gl, this.program, color);
    eye_right.m.scale(0.05, 0.05, 0.05);
    eye_right.m.translate(-3, 15, -12);
    eye_right.m.rotate(-10, 1,0,0)
    
    this.addPart(eye_right);
    
    color = [5,5,5,1]
    let pupil_right = new Cube(this.gl, this.program, color);
    pupil_right.m.scale(0.05, 0.05, 0.05);
    pupil_right.m.translate(-2.75, 15, -13);
    pupil_right.m.scale(0.5, 0.5, 0.5);
    pupil_right.m.translate(0,0, 1.5);
    pupil_right.m.rotate(-10, 1,0,0)
    this.addPart(pupil_right);






  }
  addPart(part: Cube) {
    this.parts.push(part);
  }
  attachCamera(camera: Camera) {
    this.camera = camera;
  }
  draw() {
    for (const part of this.parts) {
      part.draw();
    }
    let axis_y = new Cube(this.gl, this.program, [0,255, 1]);
    axis_y.m.setScale(0.01, 30, 0.01);
    axis_y.m.translate(0, -0.5,0);
    axis_y.draw();

    let axis_x = new Cube(this.gl, this.program, [255, 0, 1]);
    axis_x.m.setScale(20, 0.01, 0.01);
    axis_x.m.translate(-0.5, 0,0);
    axis_x.draw();

    let axis_z = new Cube(this.gl, this.program, [0, 0, 255, 1]);
    axis_z.m.setScale(0.01, 0.01, 20);
    axis_z.m.translate(0, 0, -0.5);
    axis_z.draw();
  }
  beginRotate(e: MouseEvent) {
    this.moving = true;
    const [x, y] = this.camera.convertMouseToEventCoords(e);
    this.camera.lastX = x;
    this.camera.lastY = y;
  }

  rotateCamera(e: MouseEvent) {
    if (!this.moving) {
      return;
    }
    this.camera.rotateCamera(e);


    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, "u_GlobalRotateMatrix"), false, this.camera.m.elements);
    const translateMatrix = new Matrix4();
    translateMatrix.setTranslate(0, 0, 0);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, "u_GlobalTranslateMatrix"), false, translateMatrix.elements);

    // clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.draw();
  }
  endRotate() {
    this.moving = false;
  }

}



let advaith = new Model(gl, program);
advaith.makeBody();
advaith.draw();

canvas.addEventListener('mousedown', (e) => {
  advaith.beginRotate(e);
});

document.addEventListener('mousemove', (e) => {
  if (advaith.moving && e.target === canvas) {
    advaith.rotateCamera(e);
  } 
});

canvas.addEventListener('mouseup', () => {
  advaith.endRotate();
});
// canvas.addEventListener('mouseleave', () => {
//   advaith.endRotate();
// })

canvas.addEventListener('mouseenter', (e) => {
  if (advaith.moving) {
    advaith.rotateCamera(e);
  } else {
    advaith.endRotate();
  }
});