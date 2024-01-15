import { useContext, useState, useEffect } from "react";
import { EthereumContext } from "../eth/context";
import './Registrations.css';

const mapEvent = (event) => ({
  blockNumber: event.blockNumber,
  who: event.args.who,
  name: event.args.name,
  id: `${event.blockHash}/${event.transactionIndex}/${event.logIndex}`,
})

function Registrations() {
  const { registry } = useContext(EthereumContext);
  const [registrations, setRegistrations] = useState(undefined);

  useEffect(() => {
    const filter = registry.filters.Registered();
    const startBlock = 0;
    const endBlock = 5022578;

    const listener = (...args) => {
      const event = args[args.length-1];
      setRegistrations(rs => [mapEvent(event), ...rs || []]);
    };
    
    const subscribe = async() => {  
      const past = [];

      for(let i = startBlock; i < endBlock; i += 50000) {
        const _startBlock = i;
        const _endBlock = Math.min(endBlock, i + 49999);
        const events = await registry.queryFilter(filter, _startBlock, _endBlock);
        past = [...past, ...events]
      }

      setRegistrations((past.reverse() || []).map(mapEvent));
      registry.on(filter, listener);  
    }
    
    subscribe();
    return () => registry.off(filter, listener);
  }, [registry]);

  return <div className="Registrations">
    <h3>Last registrations 📝</h3>
    {registrations === undefined && (
      <span>Loading..</span>
    )}
    {registrations && (
      <ul>
        {registrations.map(r => (
          <li key={r.id}><span className="address">{r.who}</span> {r.name}</li>
        ))}
      </ul>
    )}
  </div>
}

export default Registrations;