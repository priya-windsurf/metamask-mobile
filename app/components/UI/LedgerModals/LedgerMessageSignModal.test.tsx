import {
  renderScreen,
  DeepPartial,
} from '../../../util/test/renderWithProvider';
import { RootState } from '../../../reducers';
import LedgerMessageSignModal from './LedgerMessageSignModal';
import { RPCStageTypes } from '../../../reducers/rpcEvents';

const initialState: DeepPartial<RootState> = {
  rpcEvents: {
    signingEvent: {
      eventStage: RPCStageTypes.IDLE,
      rpcName: '',
      error: undefined,
    },
  },
};

describe('LedgerMessageSignModal', () => {
  it('should render correctly', () => {
    const { toJSON } = renderScreen(
      LedgerMessageSignModal,
      { name: 'LederMessageSignModal' },
      { state: initialState },
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
