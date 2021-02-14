interface Action {
  id: string;
  value: string;
  viewValue: string;
  selected: boolean;
}

interface ActionGroup {
  name: string;
  action: Action[];
}

interface ConnectorSettings {
  name: string;
  action: Action[];
}

export const ActionGroupFreshbooks: ActionGroup[]  = [
  {
    name: 'Lookup Lists',
    action: [
      {id: 'ClientsFreshbooks', value: 'Clients', viewValue: 'Clients', selected: false},
      {id: 'ProjectsFreshbooks', value: 'Projects', viewValue: 'Projects', selected: false},
      {id: 'AssetsFreshbooks', value: 'Assets', viewValue: 'Assets', selected: false}
    ]
  },
  {
    name: 'Actions',
    action: [
      {id: 'UpdateClientFreshbooks', value: 'UpdateClient', viewValue: 'Update Client', selected: false},
      {id: 'UpdateProjectFreshbooks', value: 'UpdateProject', viewValue: 'Update Project', selected: false},
      {id: 'UpdateAssetFreshbooks', value: 'UpdateAsset', viewValue: 'Update Asset', selected: false},
      {id: 'CreateClientsFreshbooks', value: 'CreateClients', viewValue: 'Create Clients', selected: false},
      {id: 'CreateProjectFreshbooks', value: 'CreateProject', viewValue: 'Create Projects', selected: false},
      {id: 'CreateAssetFreshbooks', value: 'CreateAsset', viewValue: 'Create Assets', selected: false}
    ]
  }
]

export const ActionGroupQuickbooks: ActionGroup[]  = [
  {
    name: 'Lookup Lists',
    action: [
      {id: 'ClientsQuickbooks', value: 'Clients', viewValue: 'Clients', selected: false},
      {id: 'ProjectsQuickbooks', value: 'Projects', viewValue: 'Projects', selected: false},
      {id: 'AssetsQuickbooks', value: 'Assets', viewValue: 'Assets', selected: false}
    ]
  },
  {
    name: 'Actions',
    action: [
      {id: 'UpdateClientQuickbooks', value: 'UpdateClient', viewValue: 'Update Client', selected: false},
      {id: 'UpdateProjectQuickbooks', value: 'UpdateProject', viewValue: 'Update Project', selected: false},
      {id: 'UpdateAssetQuickbooks', value: 'UpdateAsset', viewValue: 'Update Asset', selected: false},
      {id: 'CreateClientQuickbooks', value: 'CreateClient', viewValue: 'Create Clients', selected: false},
      {id: 'CreateProjectQuickbooks', value: 'CreateProject', viewValue: 'Create Projects', selected: false},
      {id: 'CreateAssetQuickbooks', value: 'CreateAsset', viewValue: 'Create Assets', selected: false}
    ]
  }
]

export const ActionGroupXero: ActionGroup[]  = [
  {
    name: 'Lookup Lists',
    action: [
      {id: 'ClientsXero', value: 'Clients', viewValue: 'Clients', selected: false},
      {id: 'ClientsXero', value: 'Projects', viewValue: 'Projects', selected: false},
      {id: 'ClientsXero', value: 'Assets', viewValue: 'Assets', selected: false}
    ]
  },
  {
    name: 'Actions',
    action: [
      {id: 'UpdateClientXero', value: 'UpdateClient', viewValue: 'Update Client', selected: false},
      {id: 'UpdateProjectXero', value: 'UpdateProject', viewValue: 'Update Project', selected: false},
      {id: 'UpdateAssetXero', value: 'UpdateAsset', viewValue: 'Update Asset', selected: false},
      {id: 'CreateClientXero', value: 'CreateClient', viewValue: 'Create Clients', selected: false},
      {id: 'CreateProjectXero', value: 'CreateProject', viewValue: 'Create Projects', selected: false},
      {id: 'CreateAssetsXero', value: 'CreateAssets', viewValue: 'Create Assets', selected: false}
    ]
  }
];

export const ActionGroupMicrosoftBusinessCentral: ActionGroup[]  = [
  {
    name: 'Lookup Lists',
    action: [
      {id: 'ClientsMicrosoftBusinessClients', value: 'Clients', viewValue: 'Clients', selected: false},
      {id: 'ClientsMicrosoftBusinessProjects', value: 'Projects', viewValue: 'Projects', selected: false},
      {id: 'ClientsMicrosoftBusinessAssets', value: 'Assets', viewValue: 'Assets', selected: false}
    ]
  },
  {
    name: 'Actions',
    action: [
      {id: 'ClientsMicrosoftBusinessUpdateClient', value: 'UpdateClient', viewValue: 'Update Client', selected: false},
      {id: 'ClientsMicrosoftBusinessUpdateProject', value: 'UpdateProject', viewValue: 'Update Project', selected: false},
      {id: 'ClientsMicrosoftBusinessUpdateAsset', value: 'UpdateAsset', viewValue: 'Update Asset', selected: false},
      {id: 'ClientsMicrosoftBusinessCreateClient', value: 'CreateClient', viewValue: 'Create Clients', selected: false},
      {id: 'ClientsMicrosoftBusinessCreateProject', value: 'CreateProject', viewValue: 'Create Projects', selected: false},
      {id: 'ClientsMicrosoftBusinessCreateAssets', value: 'CreateAssets', viewValue: 'Create Assets', selected: false}
    ]
  }
];

export const ActionGroupWave: ActionGroup[]  = [
  {
    name: 'Lookup Lists',
    action: [
      {id: 'ClientsWave', value: 'Clients', viewValue: 'Clients', selected: false},
      {id: 'ClientsWave', value: 'Clients', viewValue: 'Projects', selected: false},
      {id: 'AssetsWave', value: 'Assets', viewValue: 'Assets', selected: false}
    ]
  },
  {
    name: 'Actions',
    action: [
      {id: 'UpdateClientWave', value: 'UpdateClient', viewValue: 'Update Client', selected: false},
      {id: 'UpdateProjectWave', value: 'UpdateProject', viewValue: 'Update Project', selected: false},
      {id: 'UpdateAssetWave', value: 'UpdateAsset', viewValue: 'Update Asset', selected: false},
      {id: 'CreateClientWave', value: 'CreateClient', viewValue: 'Create Clients', selected: false},
      {id: 'CreateProjectWave', value: 'CreateProject', viewValue: 'Create Projects', selected: false},
      {id: 'CreateAssetsWave', value: 'CreateAssets', viewValue: 'Create Assets', selected: false}
    ]
  }
];

export const LookupList = {
  "form": {
    "name": "",
    "controls": [
      {
        "type": "List",
        "label": "ID"
      }
    ],
    "details": [
      {
        "type": "List",
        "placeholder": "ID",
        "formControlName": "value",
        "label": "ID",
        "appearance": "outline",
        "required": false,
        "types": "text",
        "error": "Required Field"
      }
    ],
    "is_list": true,
    "labels": "[\"Value\"]",
    "columns": "id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar , user_created varchar , user_archived integer , date_updated timestamp , date_archived timestamp , date_created timestamp, value varchar, PRIMARY KEY(id)"
  }
}