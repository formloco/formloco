export const VEHICLE_INSPECTION = {
  columns: 'user_updated, user_created, date_updated, date_created, data',
  form: {
    name: 'Vehicle Inspection',
    lists: [],
    pin: '369',
    is_published: true,
    type: 'custom',
    columns: 'id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, data jsonb, PRIMARY KEY(id)'
  }
}

export const FORMS = [
  {
    id: "fire-extinguisher",
    name: "Fire Extinguisher",
    icon: "fire_extinguisher",
    type: "custom",
    description: "Onsite inspection"
  },
  {
    id: "hazard-assessment",
    name: "Hazard Assessment",
    icon: "warning_amber",
    type: "custom",
    description: "Onsite hazard assessment gathering"
  },
  {
    id: "bahaviour-based-observation",
    name: "Bahaviour Based Observation",
    icon: "task_alt",
    type: "dynamic",
    description: "BEHAVIOUR_BASED_OBSERVATION"
  },
  {
    id: "maintenance-inspection",
    name: "Maintenance Inspection",
    icon: "manage_search",
    type: "dynamic",
    description: "Onsite inspection"
  },
  {
    id: "qr-code-scanner",
    name: "QR Code Scanner",
    icon: "qr_code_2",
    description: "QR Code Scanner - scans qr codes"
  },
  {
    id: "fire-alarm",
    name: "Fire Alarm",
    icon: "local_fire_department",
    type: "dynamic",
    description: "Onsite inspection"
  },
  {
    id: "emergency-lighting",
    name: "Emergency Lighting",
    icon: "lightbulb",
    type: "dynamic",
    description: "Onsite inspection"
  }
]