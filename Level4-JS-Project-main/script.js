var imageWidth;
var imageHeight;
var images = [];
var imagePieces = [];
var originalImagePieces = [];
var chosenImages = [];
var points = 0;

function initialize() 
{
    for (let i = 0; i < 16; i++) 
    {
        eval(`image${i}HTML = document.getElementById("image${i}");`);
        images.push(eval(`image${i}HTML`));
    }
    cutImages();

    theContainerHTML = document.getElementById('theContainer');
    theContainerHTML.style.opacity = '0';
    pointsHTML = document.getElementById('points');
    wonHTML = document.getElementById('won');
}

function selectImage(index) 
{
    if (chosenImages.length == 0) 
    {
        chosenImages.push(index);
        images[index].style.border = "2px solid red";
    } else if (index == chosenImages[0]) 
    {
        chosenImages.pop();
        images[index].style.border = "1px solid black";
        points -= 2;
    } else 
    {
        chosenImages.push(index);
        images[chosenImages[0]].style.border = "1px solid black";
        swapImages();
        chosenImages.length = 0;
        console.log(checkDone());
    }
    points++;
    pointsHTML.innerHTML = 'points: ' + points;
}

function display() 
{
    for (let i = 0; i < 16; i++) 
    {
        images[i].src = imagePieces[i];
    }
}

function cutImages() 
{
    let image = new Image();
    image.src = 'images/image.jpg';
    imageWidth = image.width / 4;
    imageHeight = image.height / 4;
    for(var y = 0; y < 4; y++) 
    {
        for(var x = 0; x < 4; x++) {
            var canvas = document.createElement('canvas');
            canvas.width = imageWidth;
            canvas.height = imageHeight;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * imageWidth, y * imageHeight, imageWidth, imageHeight, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
            originalImagePieces.push(canvas.toDataURL());
        }
    }
    for (let i = 0; i < 16; i++) 
    {
        images[i].src = imagePieces[i];
    }
}
function shuffle(array) 
{
    points = 0;
    pointsHTML.innerHTML = 'points: ' + points;
    theContainerHTML.style.opacity = '0';
    wonHTML.innerHTML = '';
    for (let i = 0; i < images.length; i++) 
    {
        images[i].setAttribute('onclick', `selectImage(${i});`);
    }

    let currentid = array.length,  randomIndex;
    while (currentid != 0) 
    {
      randomIndex = Math.floor(Math.random() * currentid);
      currentid--;
      [array[currentid], array[randomIndex]] = [
        array[randomIndex], array[currentid]];
    }
    display();
}

function swapImages() 
{
    let temp = imagePieces[chosenImages[0]];
    imagePieces[chosenImages[0]] = imagePieces[chosenImages[1]];
    imagePieces[chosenImages[1]] = temp;
    display();
}

function checkDone() 
{
    for (let i = 0; i < imagePieces.length; i++) 
    {
        if (imagePieces[i] !== originalImagePieces[i]) 
        {
            theContainerHTML.style.opacity = '0';
            return false;
        }
    }
    theContainerHTML.style.opacity = '1';
    wonHTML.innerHTML = 'You won!';
    return true;
}