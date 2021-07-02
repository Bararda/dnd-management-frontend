import React from 'react';
import EasyAccoridon from '../generic/easy-accordion/easy-accordion';
export default function Upcoming() {
	return (
		<div>
			<h2>Planned Features</h2>
			<EasyAccoridon title="More Spell Filters">
                <ul>
                    <li>
                        Average/Maximum/Minimum Damage
                    </li>
                </ul>
            </EasyAccoridon>
			<EasyAccoridon title="Inventory Manager">
                <p>Make Bags with optional dimensions (length x width x height)</p>
                <p>Bags can have optional weight limits</p>
                <p>Bags and items can have tags associated with them for easy searching</p>
            </EasyAccoridon>
			<EasyAccoridon title="More Character sheet builder functionality">
                <p>New Elements</p>
                <ul>
                    <li>
                        Circular boxes for proficiency
                    </li>
                    <li>
                        Armour Class Box
                    </li>
                    <li>Hit Point/Hit Dice type box (2 inputs, one main and one small and out of the way)</li>
                    <li>Circle input with fancy label (for prof bonus and passive perception)</li>
                    <li>Easy to create saving throws/skills lists</li>
                    <li>Money Boxes</li>
                    <li>Lined Text Area</li>
                    <li>Character information Box (Class, race, name, etc...)</li>
                </ul>
                <p>Different Borders for elements</p>
                <p>Deletion of elements</p>
                <p>Arrow key movement for elements</p>
                <p>Save/Load Character Sheet</p>
            </EasyAccoridon>
            <EasyAccoridon title="More information lookups">
                <ul>
                    <li>
                        Backgrounds
                    </li>
                    <li>
                        Classes
                    </li>
                    <li>
                        Equipment
                    </li>
                </ul>
            </EasyAccoridon>
            <EasyAccoridon title="Home Brew">
                <ul>
                    <li>
                        Spells
                    </li>
                    <li>
                        Classes
                    </li>
                    <li>
                        Backgrounds
                    </li>
                    <li>
                        Schools of Magic
                    </li>
                    <li>
                        Equipment
                    </li>
                </ul>
            </EasyAccoridon>
		</div>
	);
}
