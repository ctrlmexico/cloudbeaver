/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react';
import { useCallback } from 'react';
import styled, { css, use } from 'reshadow';

import { Icon } from '@dbeaver/core/blocks';
import { composes, useStyles } from '@dbeaver/core/theming';

import { TableViewerModel } from '../TableViewerModel';
import { TableFooterMenu } from './TableFooterMenu/TableFooterMenu';

const tableFooterStyles = composes(
  css`
    table-footer {
      composes: theme-background-secondary theme-text-on-secondary from global;
    }
    button {
      composes: theme-text-primary theme-ripple from global;
    }
  `,
  css`
    table-footer {
      height: 40px;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }
    button {
      outline: none;
      padding: 0 8px;
      display: flex;
      cursor: pointer;
      background: transparent;

      & Icon,
      & placeholder {
        height: 24px;
        width: 24px;
      }
    }
    count input,
    count placeholder {
      height: 26px;
      width: 80px;
      box-sizing: border-box;
      padding: 4px 7px;
      border: none;
      font-size: 13px;
      line-height: 24px;
    }
    reload,
    reload button {
      height: 100%;
    }
    reload,
    count,
    TableFooterMenu {
      margin-left: 16px;
    }
    time {
      composes: theme-typography--caption from global;
      margin-left: auto;
      margin-right: 16px;
    }
  `
);

type TableFooterProps = {
  model: TableViewerModel;
}

export const TableFooter = observer(function TableFooter({
  model,
}: TableFooterProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => model.setChunkSize(parseInt(e.target.value, 10)),
    [model]
  );

  return styled(useStyles(tableFooterStyles))(
    <table-footer as="div">
      <reload as="div">
        <button type="button" onClick={model.handleRefresh}>
          <Icon name="reload" />
        </button>
      </reload>
      <count as="div">
        <input type="number" value={model.getChunkSize()} onBlur={handleChange} {...use({ mod: 'surface' })} />
      </count>
      <TableFooterMenu model={model}/>
      {model.requestStatusMessage.length > 0 && (
        <time>
          {model.requestStatusMessage} - {model.queryDuration}ms
        </time>
      )}
    </table-footer>
  );
});
