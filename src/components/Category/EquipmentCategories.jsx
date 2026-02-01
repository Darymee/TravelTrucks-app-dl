import PropTypes from 'prop-types';

import Category from './Category';
import { vehicleEquipmentCategories } from '../FiltersPanel/constants';
const EquipmentCategories = ({ camper, className = '' }) => {
  const availableCategories = vehicleEquipmentCategories.filter(c =>
    c.isAvailable(camper)
  );

  return (
    <ul className={className}>
      {availableCategories.map(category => (
        <li key={category.label}>
          <Category category={category} />
        </li>
      ))}
    </ul>
  );
};

EquipmentCategories.propTypes = {
  camper: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default EquipmentCategories;
