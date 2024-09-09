const map = document.getElementById('interactive-map');
const container = document.getElementById('map-container');
const overlay = document.querySelector('.overlay');

let isZoom = false;
let isDragging = false;
let startX = 0, startY = 0, initialX = 0, initialY = 0;

// Получение текущих координат трансформации
function getTranslateValues(element) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return { x: matrix.m41, y: matrix.m42 };
}

// Функция для пересчета границ
function calculateBoundaries() {
    const rightOffset = -600; // Начальное смещение вправо
    const topOffset = 280;   // Начальное смещение вниз

    let maxX, minX, maxY, minY;

    if (isZoom) {
        // При зуме ограничиваем смещение на 200px от каждого края
        minX = -100;
        maxX = 100;
        minY = -300;
        maxY = 50;
    } else {
        // Обычные границы при отсутствии зума
        maxX = map.width.baseVal.value - container.offsetWidth + rightOffset; // Ограничение вправо
        minX = rightOffset; // Ограничение влево

        maxY = topOffset; // Верхняя граница
        minY = container.offsetHeight - map.height.baseVal.value + topOffset; // Нижняя граница
    }

    return { maxX, minX, maxY, minY };
}

map.addEventListener('mousedown', (e) => {
    overlay.classList.add('overlay--hidden');

    isDragging = true;
    map.style.cursor = 'grabbing';
    startX = e.clientX;
    startY = e.clientY;

    // Получаем текущее смещение через transform
    const translate = getTranslateValues(map);
    initialX = translate.x;
    initialY = translate.y;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let dx = e.clientX - startX;
        let dy = e.clientY - startY;
        let newX = initialX + dx;
        let newY = initialY + dy;

        // Получаем актуальные границы с учетом зума или обычного режима
        const { maxX, minX, maxY, minY } = calculateBoundaries();

        // Применение ограничений
        newX = Math.max(Math.min(newX, maxX), minX);
        newY = Math.max(Math.min(newY, maxY), minY);
        console.log(newX, newY)
        // Применяем новое положение через transform
        map.style.transform = `translate(${newX}px, ${newY}px)`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    map.style.cursor = 'grab';
});

// Зум по двойному клику
document.addEventListener('dblclick', event => {
    isZoom = !isZoom;
    map.classList.toggle('full-map');
});

// Скролл и скрытие overlay
window.addEventListener('scroll', function() {
    var element = document.getElementById('map');
    var element_top = element.getBoundingClientRect().top + window.scrollY;
    var element_bottom = element_top + element.offsetHeight;
    var w_height = window.innerHeight;

    if ((window.scrollY < element_top - w_height) || (window.scrollY > element_bottom)) {
        overlay.classList.remove('overlay--hidden');

        map.style.transform = `translate(0px, 0px)`;
    }
});


// Отображение модального окна
const mapLinks = map.querySelectorAll('path');

mapLinks.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        let self = e.currentTarget;
        console.log(self)
        self.classList.add('house-hover')
        let selfStatus = self.getAttribute('data-status');
        console.log(selfStatus)

        // let color = self.dataset.color;
        // let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
        // let currentPath = currentElement.querySelectorAll('path');
        // if(currentPath) currentPath.forEach(el => el.style.cssText=`fill: ${color}`);
        // currentElement.classList.add('text-main-orange')
    })
    el.addEventListener('mouseout', (e) => {
        let self = e.currentTarget;
        self.classList.remove('house-hover')


        // let selfClass = self.getAttribute('href');
        // let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
        // let currentPath = currentElement.querySelectorAll('path');
        // if(currentPath) currentPath.forEach(el => el.style.cssText=`fill: `);
        // currentElement.classList.remove('text-main-orange')
    })
})  