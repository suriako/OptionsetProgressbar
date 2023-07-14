import * as React from 'react';


const ProgressBarWithStages = (props) => {

  const [selectedItemId, setSelectedItemId] = React.useState(props.params.selectedKey)
  //console.log(props);

  function onClicklog(item) {
    console.log(item);
  }

  return (
    <div class='stepper-wrapper'>
      {props.params.options.map((e, i) => <div class={e.Status} key={e.Value} id={i} onClick={() => props.params.onChange(e.Value)}>
        <div class='step-counter'>{i + 1}</div>
        <div class='step-name'>{e.Label}</div>
      </div>)}
    </div>
  )

}

export default ProgressBarWithStages