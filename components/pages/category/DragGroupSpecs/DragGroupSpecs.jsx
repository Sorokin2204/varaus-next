import React from 'react';
import styles from './DragGroupSpecs.module.scss';
import { useFieldArray } from 'react-hook-form';
import DragGroup from '../../../common/DragGroup/DragGroup';
import DragItem from '../../../common/DragItem/DragItem';
import { v4 as uuidv4 } from 'uuid';
import { typeFieldList } from '../CategoryAddEdit/CategoryAddEdit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DragGroupSpecs = ({ index, providedParent, form, catGroup, fieldArray, listName, subListName, defaultAddRow, isEditable, isDeletable, newRow, onEdit }) => {
  const {
    fields: catItems,
    append,
    update,
    move,
  } = useFieldArray({
    control: form.control,
    name: `categorySpecs[${index}].list`,
  });

  const handleDrag = ({ source, destination }) => {
    if (destination) {
      const newCatList = reorder(catItems, source.index, destination.index);
      newCatList?.map((catSpec, catIndex) => {
        let newCatSpec = catSpec;
        newCatSpec.subFieldName = `categorySpecs[${index}].list[${catIndex}].subFieldValues`;
        newCatSpec.specs[0].name = `categorySpecs[${index}].list[${catIndex}].specs[0].value`;
        newCatSpec.specs[1].name = `categorySpecs[${index}].list[${catIndex}].specs[1].value`;
      });
      form.setValue(`categorySpecs[${index}].list`, newCatList);
    }
  };
  // console.log(catItems);
  return (
    <>
      <DragGroup
        providedParent={providedParent}
        onDelete={(e) => {
          e.stopPropagation();
          fieldArray.update(index, { ...catGroup, deleted: true });
        }}
        isEditable={isEditable}
        isDeletable={isDeletable}
        form={form}
        name={`categorySpecs[${index}].title`}
        title={catGroup?.title}
        key={catGroup?.ID}
        onAddNew={() =>
          append({
            order: 0,
            ID: uuidv4(),
            specs: newRow(index, catItems.length),
            subFieldValues: [],
            subFieldName: `categorySpecs[${index}].list[${catItems.length}].subFieldValues`,
          })
        }>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="droppable">
            {(dropProvided, snapshot) => (
              <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                {catItems?.map((catSpec, indexx) => {
                  return (
                    !catSpec?.deleted && (
                      <Draggable key={catSpec.ID} draggableId={catSpec.ID} index={indexx}>
                        {(provided, snapshot) => (
                          <div key={catSpec?.id} ref={provided.innerRef} {...provided.draggableProps}>
                            <div>
                              <DragItem provided={provided} form={form} list={catSpec?.specs} onDelete={() => update(indexx, { ID: catSpec?.ID, deleted: true })} item={catSpec} onEdit={onEdit} />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  );
                })}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DragGroup>
    </>
  );
};

export default DragGroupSpecs;
