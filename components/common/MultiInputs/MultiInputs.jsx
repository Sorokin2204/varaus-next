import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DragGroupSpecs, { reorder } from '../../pages/category/DragGroupSpecs/DragGroupSpecs';
import styles from './MultiInputs.module.scss';
const MultiInputs = ({ fieldArray, form, textNotFound, isEditable, isDeletable, newRow, onEdit }) => {
  const handleDrag = ({ source, destination }) => {
    if (destination) {
      const newCatListParent = reorder(fieldArray.fields, source.index, destination.index);
      newCatListParent?.map((newCatList, parentIndex) => {
        newCatList?.list?.map((catSpec, catIndex) => {
          catSpec.subFieldName = `categorySpecs[${parentIndex}].list[${catIndex}].subFieldValues`;
          catSpec.specs[0].name = `categorySpecs[${parentIndex}].list[${catIndex}].specs[0].value`;
          catSpec.specs[1].name = `categorySpecs[${parentIndex}].list[${catIndex}].specs[1].value`;
        });
      });

      form.setValue(`categorySpecs`, newCatListParent);
    }
  };

  return fieldArray.fields?.length !== 0 ? (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="droppable-outer">
        {(dropProvided, snapshot) => (
          <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
            {fieldArray.fields?.map(
              (catGroup, index) =>
                !catGroup?.deleted && (
                  <Draggable key={catGroup.ID} draggableId={catGroup.ID} index={index}>
                    {(provided, snapshot) => (
                      <div key={catGroup.ID} ref={provided.innerRef} {...provided.draggableProps}>
                        <div>
                          <DragGroupSpecs providedParent={provided} newRow={newRow} isEditable={isEditable} isDeletable={isDeletable} catGroup={catGroup} index={index} form={form} fieldArray={fieldArray} onEdit={onEdit} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ),
            )}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <div style={{ fontSize: '16px', margin: '0 auto', display: 'flex', justifyContent: 'center', padding: '32px 0' }}>{textNotFound}</div>
  );
};

export default MultiInputs;
