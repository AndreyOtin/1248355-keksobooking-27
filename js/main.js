import { setInitialFormState, updateAddressInputValue, toggleAdFormDisebledState, setFormEventListeners } from './form.js';
import { map, DEFAULT_COORDINATE, renderMarkers, setMainMarkerDrag, getMarkerCoordinate, resetMap } from './map.js';
import { toggleFiltersDisabledState, setFilterFormEventListeners } from './filter.js';
import { adFormPristine } from './pristine-setup.js';
import { getData } from './api.js';
import { showAlert } from './dom-util.js';
import { debounce } from './util.js';

const DEBOUNCE_DELAY = 500;

setInitialFormState(adFormPristine);
toggleFiltersDisabledState();
setFormEventListeners(adFormPristine, getMarkerCoordinate, resetMap);

map.on('load', () => {
  toggleAdFormDisebledState();
  setMainMarkerDrag(updateAddressInputValue);
  getData(
    (data) => {
      renderMarkers(data);
      setFilterFormEventListeners(debounce(renderMarkers, DEBOUNCE_DELAY), data);
      toggleFiltersDisabledState();
    },
    (error) => {
      showAlert(error, map.getContainer());
    });
})
  .setView(DEFAULT_COORDINATE, 10);
