import { v4 as uuid } from 'uuid';

const dataTypes = {
  IN_PROGRESS: "in progress",
  DONE: "done",
  TO_DO: "to do"
}

const data = [{
    title: "Daisy",
    text: "family careful height syllable chance taken factory",
    type: dataTypes.DONE,
    id: uuid()
  },
  {
    title: "William",
    text: "shine excitement news potatoes bigger pour sitting",
    type: dataTypes.IN_PROGRESS,
    id: uuid()
  },
  {
    title: "Mike",
    text: "series bite as kind front light combine",
    type: dataTypes.TO_DO,
    id: uuid()
  },
  {
    title: "Iva",
    text: "aside camera corner stood flower deep differ",
    type: dataTypes.DONE,
    id: uuid()
  },
  {
    title: "Floyd",
    text: "behavior careful temperature strip herself moving fog",
    type: dataTypes.TO_DO,
    id: uuid()
  },
  {
    title: "Gregory",
    text: "dried between two society thread essential gain",
    type: dataTypes.IN_PROGRESS,
    id: uuid()
  }
];

const initialState = {
  [dataTypes.DONE]: data.filter(item => item.type === dataTypes.DONE),
  [dataTypes.IN_PROGRESS]: data.filter(item => item.type === dataTypes.IN_PROGRESS),
  [dataTypes.TO_DO]: data.filter(item => item.type === dataTypes.TO_DO),
};

export { initialState, dataTypes };