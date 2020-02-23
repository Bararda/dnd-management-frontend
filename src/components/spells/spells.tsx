import React, { useState, useEffect } from "react";
import {
    SpellService,
    SchoolService,
    DamageTypeService,
    ComponentTypeService
} from "../../utils/services/";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {
    SpellProps,
    SchoolObj,
    TypeObj,
    ColorObj,
    SpellCardProps,
    TitleTextProps,
    ComponentType
} from "./spells.interface";
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
    damage_types: Array<string>;
    component_types: Array<string>;
}

const Spells: React.FC<SpellProps> = props => {
    const [spellList, setSpellList] = useState(new Array<Spell>());
    const [damageTypeFilter, setDamageTypeFilter] = useState("0");
    const [componentTypeFilter, setComponentTypeFilter] = useState(
        new Array<string>()
    );
    const [schoolList, setSchoolList] = useState({});
    const [damageTypeList, setDamageTypes] = useState({});
    const [selectColor, setSelectColor] = useState("");
    const [componentTypeList, setComponentTypes] = useState(
        new Array<ComponentType>()
    );
    const [visibleSpellList, setVisibleSpellList] = useState(
        new Array<Spell>()
    );

    useEffect(() => {
        const spellService = new SpellService();
        const schoolService = new SchoolService();
        const damageTypeService = new DamageTypeService();
        const componentTypeService = new ComponentTypeService();
        Promise.all([
            schoolService.getSchools(),
            spellService.getSpells(),
            damageTypeService.getDamageTypes(),
            componentTypeService.getComponentTypes()
        ]).then(([schools, spells, damageTypes, componentTypes]) => {
            let schoolObj: SchoolObj = {};
            let typeObj: TypeObj = {};
            for (const school of schools) {
                schoolObj[school.school_id] = school.school_name;
            }
            for (const type of damageTypes) {
                typeObj[type.damage_type_id] = type.damage_type_name;
            }
            let list = [];
            for (const compType of componentTypes) {
                list.push(compType.component_type_name);
            }
            setSchoolList(schoolObj);
            setVisibleSpellList(spells);
            setSpellList(spells);
            setDamageTypes(typeObj);
            setSelectColor("white");
            setComponentTypes(componentTypes);
            setComponentTypeFilter(list);
        });
    }, []);

    useEffect(() => {
        filterSpells();
    }, [damageTypeFilter]);

    useEffect(() => {
        filterSpells();
    }, [componentTypeFilter]);

    const filterSpells = () => {
        let visibleSpells = spellList;
        if (parseInt(damageTypeFilter, 10) === 0) {
            setSelectColor("white");
        } else {
            setSelectColor(getColor(damageTypeFilter));
            visibleSpells = spellList.filter(spell => {
                return spell.damage_types.includes(damageTypeFilter);
            });
        }
        visibleSpells = visibleSpells.filter(spell => {
            for (const compType of spell.component_types) {
                if (!componentTypeFilter.includes(compType)) {
                    return false;
                }
            }
            return true;
        });

        setVisibleSpellList(visibleSpells);
    };

    const filterByDamageType = (event: any) => {
        let dt = event.target.value;
        setDamageTypeFilter(dt);
    };

    const filterComponentType = (event: any) => {
        let list = componentTypeFilter;
        if (!list.includes(event.target.value)) {
            list[list.length] = event.target.value;
        } else {
            list = list.filter(compType => {
                return compType !== event.target.value;
            });
        }
        setComponentTypeFilter([...list]);
    };

    return (
        <div>
            <div className="header">
                <div className="component-types">
                    {componentTypeList.map(ct => {
                        return (
                            <Form.Check
                                type="checkbox"
                                className="checkbox"
                                onChange={filterComponentType}
                                value={ct.component_type_name}
                                label={ct.component_type_name}
                                checked={componentTypeFilter.includes(
                                    ct.component_type_name
                                )}
                            />
                        );
                    })}
                </div>
                <div className="damage-types">
                    <Form.Control
                        as="select"
                        onChange={filterByDamageType}
                        style={{ backgroundColor: selectColor }}
                    >
                        <option value="0" style={{ backgroundColor: "white" }}>
                            None
                        </option>
                        {Object.values<string>(damageTypeList).map(dt => {
                            let color = getColor(dt);
                            return (
                                <option
                                    value={dt}
                                    style={{ backgroundColor: color }}
                                >
                                    {dt}
                                </option>
                            );
                        })}
                    </Form.Control>
                </div>
            </div>
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
    };

    return colors[damageType] || "aqua";
};

const SpellCard: React.FC<SpellCardProps> = props => {
    let borderColor = "#1F1F20";

    if (props.spell.damage_types.length > 0) {
        borderColor = getColor(props.spell.damage_types[0]);
    }
    let border = "5px solid " + borderColor;

    return (
        <Card style={{ borderLeft: border }}>
            <Accordion.Toggle as={Card.Header} eventKey={props.spell.spell_id}>
                {props.spell.spell_name}
            </Accordion.Toggle>

            <Accordion.Collapse eventKey={props.spell.spell_id}>
                <Card.Body>
                    <div className="level">
                        {ordinal_suffix_of(props.spell.spell_level)} level{" "}
                        {props.schoolList[props.spell.school_id]}
                    </div>
                    <TitleText
                        title="Casting Time"
                        text={props.spell.casting_time}
                    ></TitleText>
                    <TitleText
                        title="Range"
                        text={props.spell.spell_range}
                    ></TitleText>
                    <TitleText
                        title="Components"
                        text={
                            props.spell.components
                                ? props.spell.component_types.join(", ") +
                                  ` (${props.spell.components})`
                                : props.spell.component_types.join(", ")
                        }
                    ></TitleText>
                    <TitleText
                        title="Duration"
                        text={props.spell.duration}
                    ></TitleText>
                    <TitleText
                        title="Classes"
                        text={props.spell.classes.join(", ")}
                    ></TitleText>
                    {props.spell.description}
                    {props.spell.higher_level && (
                        <TitleText
                            title="Higher Levels"
                            text={props.spell.higher_level}
                        ></TitleText>
                    )}
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
