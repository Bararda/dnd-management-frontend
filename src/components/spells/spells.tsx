import React, { useState, useEffect } from "react";
import {SpellService, SchoolService, DamageTypeService} from "../../utils/services/";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {SpellProps, SchoolObj, TypeObj, ColorObj, SpellCardProps, TitleTextProps} from "./spells.interface";
import "./spells.css";


interface Spell {
    spell_id: number;
    spell_name: string;
    spell_level: number;
    duration: string;
    casting_time: string;
    components: string;
    school_id: number;
    damage: string;
    description: string;
    spell_range: string;
    higher_level: string;
    damage_types: Array<string>
}

const Spells: React.FC<SpellProps> = props => {
    const [spellList, setSpellList] = useState(new Array<Spell>());
    const [schoolList, setSchoolList] = useState({});
    const [damageTypeList, setDamageTypes] = useState({});
    const [selectColor, setSelectColor] = useState("");
    const [visibleSpellList, setVisibleSpellList] = useState(new Array<Spell>());
    useEffect(() => {
        const spellService = new SpellService();
        const schoolService = new SchoolService();
        const damageTypeService = new DamageTypeService();
        Promise.all([
            schoolService.getSchools(),
            spellService.getSpells(),
            damageTypeService.getDamageTypes()
        ]).then(([schools, spells, damageTypes]) => {
            let schoolObj: SchoolObj = {};
            let typeObj: TypeObj = {};
            for (const school of schools) {
                schoolObj[school.school_id] = school.school_name;
            }
            for (const type of damageTypes) {
                
                typeObj[type.damage_type_id] = type.damage_type_name;
            }
            console.log(Object.values<string>(typeObj));
            setSchoolList(schoolObj);
            setVisibleSpellList(spells);
            setSpellList(spells);
            setDamageTypes(typeObj);
            setSelectColor("white");
        });
    }, []);

    const filterByDamageType = (event: any) => {
        console.log(event.target.value);
        let damageType = event.target.value;
        if(parseInt(damageType, 10) === 0) {
            setSelectColor("white");
            setVisibleSpellList(spellList);
        } else {
            setSelectColor(getColor(damageType));
            let visibleSpells = spellList.filter(spell => {
                return spell.damage_types.includes(damageType);
            });
            setVisibleSpellList(visibleSpells);
        }
    }

    return (
        <div>
            <Form.Control as="select" onChange={filterByDamageType} style={{backgroundColor: selectColor}}>
            <option value="0" style={{backgroundColor: "white"}}>None</option>
                {Object.values<string>(damageTypeList).map(dt => {
                    let color = getColor(dt);
                    return (
                        <option value={dt} style={{backgroundColor: color}}>{dt}</option>
                    );
                })}
            </Form.Control>
            <Accordion defaultActiveKey="0">
                {visibleSpellList?.map((spell, i) => {
                    return (
                        <SpellCard
                            key={i}
                            spell={spell}
                            schoolList={schoolList}
                            damageTypeList={damageTypeList}
                        ></SpellCard>
                    );
                })}
            </Accordion>
        </div>
    );
};



const getColor = (damageType: string) => {
    const colors: ColorObj = {
        acid: "#66F462",
        lightning: "#4E55FF",
        fire: "#FF351B",
        thunder: "#FFE24F",
        bludgeoning: "#A4A4A4",
        slashing: "#6d6e6d",
        piercing: "#421d13",
        cold: "#96E0FF",
        force: "white",
        necrotic: "black",
        poison: "purple",
        radiant: "#FFF8CC",
        psychic: "#BCBAF0"
    }
    
    return colors[damageType] || "aqua";
}

const SpellCard: React.FC<SpellCardProps> = props => {
    let borderColor = "#1F1F20"

    if(props.spell.damage_types.length > 0) {
        borderColor = getColor(props.spell.damage_types[0]);
    }
    let border = "5px solid " + borderColor

    return (
        <Card style={{borderLeft: border}}>
            <Accordion.Toggle as={Card.Header} eventKey={props.spell.spell_id}>
                {props.spell.spell_name}
            </Accordion.Toggle>

            <Accordion.Collapse eventKey={props.spell.spell_id}>
                <Card.Body>
                    <div className="level">
                        {ordinal_suffix_of(props.spell.spell_level)} level{" "}
                        {props.schoolList[props.spell.school_id]}
                    </div>
                    <TitleText title="Casting Time" text={props.spell.casting_time}></TitleText>
                    <TitleText title="Range" text={props.spell.spell_range}></TitleText>
                    <TitleText title="Components" text={props.spell.components ? 
                        props.spell.component_types.join(", ") + ` (${props.spell.components})` :
                        props.spell.component_types.join(", ")}></TitleText>
                    <TitleText title="Duration" text={props.spell.duration}></TitleText>
                    <TitleText title="Classes" text={props.spell.classes.join(", ")}></TitleText>
                    {props.spell.description}
                    {props.spell.higher_level && 
                        <TitleText title="Higher Levels" text={props.spell.higher_level}>
                        </TitleText>
                    }
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};



const TitleText: React.FC<TitleTextProps> = props => {
    return (
        <div>
            <span className="title">{props.title}: </span>
            <span>{props.text}</span>
        </div>
    );
};

function ordinal_suffix_of(i: number) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

export default Spells;
