// change selected file name accordingly
document.addEventListener('DOMContentLoaded', () => {
   const fileChoiceElement = document.getElementById('file-choice');
   const selectedFile = fileChoiceElement.value;

   document.getElementById('selected-file').textContent = selectedFile;

   fileChoiceElement.addEventListener('change', () => {
      const selectedFile = fileChoiceElement.value;
      document.getElementById('selected-file').textContent = selectedFile;
   })
})