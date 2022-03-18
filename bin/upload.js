const imgInp = document.getElementById("image-button")
const imagePreview = document.getElementById("imagePreview")
 imgInp.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
      imagePreview.src = URL.createObjectURL(file)
    }
  }

  

  //drag and drop

  // let dropArea = document.getElementById('form-inner-container"')
  // const dragEnter = (event)=>{
  //   event.traget.style.background = "#00000";
  // }
  // dropArea.addEventListener('dragenter', dragEnter, false)
  // dropArea.addEventListener('dragleave', handlerFunction, false)
  // function allowDrop(ev) {
  //   ev.preventDefault();
  // }
  
  // function drag(ev) {
  //   ev.dataTransfer.setData("file", ev.target.id);
  // }
  
  // function drop(ev) {
  //   ev.preventDefault();
  //   var data = ev.dataTransfer.getData("file");
  //   var parent = document.getElementById(data)
  //   var image = parent.childNodes[0]
  //   console.log(data)
  //   console.log(image)

  //   image.src = data
  // }