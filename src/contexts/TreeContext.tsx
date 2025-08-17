import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Company, TreeNode } from '../types';

interface TreeState {
  selectedCompany: Company | null;
  selectedNode: TreeNode | null;
}

type TreeAction =
  | { type: 'SET_SELECTED_COMPANY'; payload: Company | null }
  | { type: 'SET_SELECTED_NODE'; payload: TreeNode | null }
  | { type: 'RESET_SELECTION' };

const initialState: TreeState = {
  selectedCompany: null,
  selectedNode: null,
};

const treeReducer = (state: TreeState, action: TreeAction): TreeState => {
  switch (action.type) {
    case 'SET_SELECTED_COMPANY':
      return {
        ...state,
        selectedCompany: action.payload,
        selectedNode: null,
      };
    case 'SET_SELECTED_NODE':
      return {
        ...state,
        selectedNode: action.payload,
      };
    case 'RESET_SELECTION':
      return {
        ...state,
        selectedNode: null,
      };
    default:
      return state;
  }
};

interface TreeContextType {
  state: TreeState;
  dispatch: React.Dispatch<TreeAction>;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const TreeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(treeReducer, initialState);

  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeContext = (): TreeContextType => {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error('useTreeContext deve ser usado dentro de um TreeProvider');
  }
  return context;
};
