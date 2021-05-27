export interface App {
  id: string,
  name: string,
  url: string,
  experimental: boolean,
  enabled: boolean
}

export const APPS = [
  {
    id: "mobile-forms",
    name: "Mobile Forms",
    url: "https://mobile.formloco.com",
    experiment: false,
    enabled: false
  },
  {
    id: "hazard-assessment",
    name: "Hazard Assessment",
    url: "https://hazard-assessment.formloco.com/",
    experiment: false,
    enabled: false
  }
]
