import React, { useState } from "react";
import SpellService from "../../utils/services/spell.service";

interface SpellProps {
    name?: string;
}

const Spells: React.FC<SpellProps> = props => {
    const [spellList, setSpellList] = useState([]);
    const spellService = new SpellService();
    const update = (spells: any) => {
        setSpellList(spells);
    };
    return (
        <div>Spells TEST</div>
    );
};

export default Spells;
