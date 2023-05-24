const sunImages = ['cloud_sun1.jpg', 'cloud_sun2.jpg', 'cloud_sun3.jpg', 'cloud_sun4.jpg', 'cloud_sun5.jpg'];
const darkImages = ['cloud_dark1.jpg', 'cloud_dark2.jpg', 'cloud_dark3.jpg', 'cloud_dark4.jpg', 'cloud_dark5.jpg'];
const modes = document.getElementById('mode');

function onImage(mode){
    const selectImage = mode[Math.floor(Math.random() * mode.length)];

    const bg = document.createElement('img');
    bg.src = `img/bg/${selectImage}`;
    bg.id = 'bg';

    document.body.appendChild(bg);
}

onImage(sunImages);