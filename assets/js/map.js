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
    const topOffset = 280;    // Начальное смещение вниз

    let maxX, minX, maxY, minY;
    let width = window.innerWidth;

    if (width <= 768) {
        minX = 0;
        maxX = map.width.baseVal.value - container.offsetWidth + rightOffset;
        minY = -1025;
        maxY = 200;
    } else {
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
    }
    

    return { maxX, minX, maxY, minY };
}

// Функция для инициализации перемещения
function startDragging(clientX, clientY) {
    overlay.classList.add('overlay--hidden');
    isDragging = true;
    map.style.cursor = 'grabbing';
    startX = clientX;
    startY = clientY;

    // Получаем текущее смещение через transform
    const translate = getTranslateValues(map);
    initialX = translate.x;
    initialY = translate.y;
}

// Функция для перемещения карты
function dragMap(clientX, clientY) {
    if (isDragging) {
        let dx = clientX - startX;
        let dy = clientY - startY;
        let newX = initialX + dx;
        let newY = initialY + dy;

        // Получаем актуальные границы с учетом зума или обычного режима
        const { maxX, minX, maxY, minY } = calculateBoundaries();

        // Применение ограничений
        newX = Math.max(Math.min(newX, maxX), minX);
        newY = Math.max(Math.min(newY, maxY), minY);

        // Применяем новое положение через transform
        map.style.transform = `translate(${newX}px, ${newY}px)`;
    }
}

function stopDragging() {
    isDragging = false;
    map.style.cursor = 'grab';
}

// Мышиные события
map.addEventListener('mousedown', (e) => startDragging(e.clientX, e.clientY));
document.addEventListener('mousemove', (e) => dragMap(e.clientX, e.clientY));
document.addEventListener('mouseup', stopDragging);


function resize() {
    let width = window.innerWidth;

    if (width <= 768) {
        // Тач-события
        map.addEventListener('touchstart', (e) => {
            console.log('touch start')
            $('html').addClass('no-scroll')
            const touch = e.touches[0];
            startDragging(touch.clientX, touch.clientY);
        });
        document.addEventListener('touchmove', (e) => {
            console.log('touch move')
            const touch = e.touches[0];
            dragMap(touch.clientX, touch.clientY);
        });
        document.addEventListener('touchend', () => {
            stopDragging()
            $('html').removeClass('no-scroll')
        });
    } else {
        return
    }
}

window.addEventListener('resize', () => {
    resize()
})
resize()




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

    })
    el.addEventListener('mouseout', (e) => {
        let self = e.currentTarget;
        self.classList.remove('house-hover')

    })
})  
