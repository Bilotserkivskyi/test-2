import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { Divider, Tooltip, Text } from '../../components';
import { sizes } from '../../theme';

import DynamicFields from './DynamicFields';

const FieldBlock = ({ index, name, removeAction, clearAction, fieldList, setFieldList, copyAction }) => {
  const [open, setOpen] = React.useState(true);
  const { t } = useTranslation();

  const generateFieldListDescription = (fields) => {
    if (!fields || fields.length === 0) {
      return <Text tid="USER_REQUEST.BLOCK_TITLE.EMPTY" />;
    }

    return fields.map((value) => t(`USER_REQUEST.DATA.${value}`)).join(', ');
  };

  return (
    <Block>
      {open ? (
        <React.Fragment>
          <Header>
            <Tooltip tid="USER_REQUEST.FORM.ACTION.CLOSE">
              <ActionButton onClick={() => setOpen(false)} size="small">
                <ExpandMoreIcon />
              </ActionButton>
            </Tooltip>

            <ActionsBlock>
              <Tooltip tid="USER_REQUEST.FORM.ACTION.COPY">
                <ActionButton onClick={copyAction} size="small">
                  <FileCopyIcon />
                </ActionButton>
              </Tooltip>
              <Tooltip tid="USER_REQUEST.FORM.ACTION.CLEAR">
                <ActionButton onClick={clearAction} size="small">
                  <DeleteOutlineIcon />
                </ActionButton>
              </Tooltip>
              <Tooltip tid="USER_REQUEST.FORM.ACTION.DELETE">
                <ActionButton onClick={removeAction} size="small">
                  <DeleteIcon />
                </ActionButton>
              </Tooltip>
            </ActionsBlock>
          </Header>
          <Divider />
          <BlockContnet>
            <DynamicFields
              setFieldList={(value) => setFieldList(value, index)}
              fieldList={fieldList[index]}
              name={name}
            />
          </BlockContnet>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Header>
            <Tooltip tid="USER_REQUEST.FORM.ACTION.OPEN">
              <ActionButton onClick={() => setOpen(true)} size="small">
                <ExpandLessIcon />
              </ActionButton>
            </Tooltip>
            <TitleBlock>{generateFieldListDescription(fieldList[index])}</TitleBlock>
          </Header>
          <Divider />
        </React.Fragment>
      )}
    </Block>
  );
};

FieldBlock.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  removeAction: PropTypes.func.isRequired,
  clearAction: PropTypes.func.isRequired,
  fieldList: PropTypes.array.isRequired,
  setFieldList: PropTypes.func.isRequired,
  copyAction: PropTypes.func.isRequired,
};

const TitleBlock = styled.div``;

const ActionsBlock = styled.div``;

const ActionButton = styled(IconButton)`
  &:not(:last-of-type) {
    margin-right: ${sizes.spacing(1)};
  }
`;

const Header = styled.div`
  margin-bottom: ${sizes.spacing(1)};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Block = styled.div`
  width: 100%;
  &:not(:last-of-type) {
    margin-bottom: ${sizes.spacing(3)};
  }
`;

const BlockContnet = styled.div`
  padding: ${sizes.spacing(3)} 0;
`;

export default FieldBlock;