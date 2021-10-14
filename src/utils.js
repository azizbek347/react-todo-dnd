const setToStorage = (key, data) => window.localStorage.setItem(key, JSON.stringify(data));

const getFromStorage = (key) => JSON.parse(window.localStorage.getItem(key));

const dranEndCB = ( state, source,destination) => {
  const srcClone = [...state[source.droppableId]];
  const destClone = source.droppableId === destination.droppableId ? srcClone : [...state[destination.droppableId]];
  const [movedElement] = srcClone.splice(source.index, 1);
  movedElement.type = destination.droppableId;
  destClone.splice(destination.index, 0, movedElement);

  return {
    [source.droppableId]: srcClone,
    ...(source.droppableId === destination.droppableId ? {} : { [destination.droppableId]: destClone})
  }
}

export { setToStorage, getFromStorage, dranEndCB };