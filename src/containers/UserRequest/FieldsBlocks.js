import React from 'react';
import styled from 'styled-components';
import { FieldArray } from 'redux-form';

import { Text } from '../../components';
import { OutlinedButton } from '../../components/buttons';
import { USER_REQUEST_LIST } from '../../constants/fields';
import { sizes } from '../../theme';

import FieldBlock from './FieldBlock';

import { fieldListValidation } from '../../validations/userRequest';

const FieldsBlocks = () => {
  const [fieldList, setFieldList] = React.useState({});

  const handleSetFieldList = (value, index) => {
    setFieldList({ ...fieldList, [index]: value });
  };

  const handleRemoveBlock = (fields, index) => {
    fields.remove(index);

    const fieldListNew = { ...fieldList };
    delete fieldListNew[index];
    setFieldList(fieldListNew);
  };

  const handleClearBlock = (index, fields) => {
    const fieldsTypes = fieldList[index];

    if (fieldsTypes) {
      const newIndex = fields.length;
      fields.push({});
      fields.swap(index, newIndex);
      fields.pop();
    }
  };

  const handleCopyBlock = (index, fields) => {
    const fieldsTypes = fieldList[index];

    if (fieldsTypes) {
      fields.push(fields.get(index));

      const lastIndex = Object.keys(fieldList).length;
      setFieldList({ ...fieldList, [lastIndex]: fieldsTypes });
    }
  };

  return (
    <Container>
      <FieldArray
        name={USER_REQUEST_LIST}
        validate={fieldListValidation}
        component={({ fields }) => (
          <Content>
            {fields.map((field, index) => {
              return (
                <React.Fragment key={index}>
                  <FieldBlock
                    setFieldList={handleSetFieldList}
                    fieldList={fieldList}
                    clearAction={() => handleClearBlock(index, fields)}
                    copyAction={() => handleCopyBlock(index, fields)}
                    removeAction={() => handleRemoveBlock(fields, index, field)}
                    index={index}
                    name={field}
                  />
                </React.Fragment>
              );
            })}
            <ButtonAdd onClick={() => fields.push({})}>
              <Text tid="USER_REQUEST.FORM.ADD_BLOCK" />
            </ButtonAdd>
          </Content>
        )}
      />
    </Container>
  );
};

FieldsBlocks.propTypes = {};

const ButtonAdd = styled(OutlinedButton)`
  && {
    margin-top: ${sizes.spacing(2)};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default React.memo(FieldsBlocks, () => true);