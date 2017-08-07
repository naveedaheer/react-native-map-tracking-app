import RunInfo from './runInfo';

export default class RunInfoNumeric extends RunInfo {

    formatValue() {
        {console.log('props', this.props)}
           return [this.state.value.toFixed(2), this.props.unit].join(' ');
    }
}