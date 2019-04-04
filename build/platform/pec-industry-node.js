import { ParticleExecutionContext } from '../runtime/particle-execution-context.js';
import { MessageChannel } from '../runtime/message-channel.js';
const pecIndustry = loader => {
    return (pecId, idGenerator) => {
        const channel = new MessageChannel();
        const _throwAway = new ParticleExecutionContext(channel.port1, pecId, idGenerator, loader);
        return channel.port2;
    };
};
export { pecIndustry as PecIndustry };
//# sourceMappingURL=pec-industry-node.js.map