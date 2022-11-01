import { QuerySelector } from './dom-util.js';

const sliderElement = document.querySelector(QuerySelector.CLASS_NAME.SLIDER);
let isDragged = false;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000
  },
  connect: 'lower',
  start: 0,
  step: 1,
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});

const setSliderToMinValue = (inputElement) => {
  if (!isDragged) {
    sliderElement.noUiSlider.set(inputElement.min);
  }
};

const resetSlider = (inputElement) => {
  isDragged = false;
  setSliderToMinValue(inputElement);
};

const setInputValueToSlider = (inputElement) => {
  sliderElement.noUiSlider.set(inputElement.value);
};

const toggleSliderdisabledState = () => {
  const isDisabled = sliderElement.getAttribute('disabled');
  const handleElement = sliderElement.querySelector('.noUi-handle');

  if (isDisabled) {
    sliderElement.removeAttribute('disabled');
    handleElement.tabIndex = 0;
  } else {
    sliderElement.setAttribute('disabled', true);
    handleElement.tabIndex = -1;
  }
};

const setSliderSlide = (inputElement, pristine) => {
  setSliderToMinValue(inputElement);
  sliderElement.noUiSlider.on('slide', () => {
    isDragged = true;
    inputElement.value = sliderElement.noUiSlider.get();
    pristine.validate(inputElement);
  }
  );
};

export { setSliderSlide, setSliderToMinValue, resetSlider, setInputValueToSlider, toggleSliderdisabledState };
