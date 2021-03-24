/* eslint no-param-reassign: ["error", { ignorePropertyModificationsFor: ["patch"] }] */

module.exports = (patch) => {
  if (patch.brand === undefined && patch.provider_id) {
    patch.brand = patch.provider_id;
  }

  if (patch.brand_id === undefined && patch.provider_location_id) {
    patch.brand_id = patch.provider_location_id;
  }

  if (patch.appointments_available === undefined) {
    patch.appointments_available = patch.appointments.length > 0;
  }

  const appointmentTypes = {};
  const appointmentVaccineTypes = {};

  for (const appointment of patch.appointments) {
    if (
      appointment.appointment_types &&
      appointment.appointment_types.length > 0
    ) {
      for (const appointmentType of appointment.appointment_types) {
        appointmentTypes[appointmentType] = true;
      }
    } else {
      appointmentTypes.unknown = true;
    }

    if (appointment.vaccine_types && appointment.vaccine_types.length > 0) {
      for (const vaccineType of appointment.vaccine_types) {
        appointmentVaccineTypes[vaccineType] = true;
      }
    } else {
      appointmentVaccineTypes.unknown = true;
    }
  }

  patch.appointment_types = appointmentTypes;
  patch.appointment_vaccine_types = appointmentVaccineTypes;

  return patch;
};