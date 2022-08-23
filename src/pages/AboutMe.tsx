import React from 'react';
import {
    Button,
    View,
    Flex,
    ProgressCircle,
    Image,
    Checkbox,
    Text,
    Heading,
    ListBox,
    Section,
    Item
} from '@adobe/react-spectrum';
import Bullet from '@spectrum-icons/workflow/Code';

function AboutMe() {
    return (
        <View padding={"static-size-400"} paddingTop={0}>
            <h1>About Me</h1>
            <Text>Hi, I'm Navaneeth, extremely passionate about UI/UX, I care about aesthetics but at the same time I
                deliver clean code with great design patterns which help me reuse most of the code I write.</Text>
            <Heading>Please use Web Browser for the best user experience</Heading>
            <ListBox aria-label="Options" selectionMode="single">
                <Section title="Here are the list of requirements that I accomplished in this task">
                    <Item>
                        <Bullet size="S"/>
                        <Text>Listing the dogs on a catalog - Homepage</Text>
                    </Item>
                    <Item>
                        <Bullet size="S"/>
                        <Text>The ability to select a specific dog breed to obtain more information</Text>
                    </Item>
                    <Item >
                        <Bullet size="S"/>
                        <Text>Allow a user to compare different dog breeds to help identify a dog they like</Text>
                    </Item>
                    <Item >
                        <Bullet size="S"/>
                        <Text>Compare tray at the bottom when you select 2 or more dogs (restricted to max of 4)</Text>
                    </Item>
                    <Item >
                        <Bullet size="S"/>
                        <Text>Click on hearts to favorite the dog you like</Text>
                    </Item>
                    <Item >
                        <Bullet size="S"/>
                        <Text>Click on "Show Favorites" toggle to toggle between your favorite dogs and everything else.</Text>
                    </Item>
                    <Item>
                        <Bullet size="S"/>
                        <Text>Click on "Show Favorites" toggle to toggle between your favorite dogs and everything else.</Text>
                    </Item>
                    <Item>
                        <Bullet size="S"/>
                        <Text>Search for the breeds you want to using the Searchbar</Text>
                    </Item>
                    <Item>
                        <Bullet size="S"/>
                        <Text>Filter data based on Countries and Breed Type</Text>
                    </Item>
                    <Item>
                        <Bullet size="S"/>
                        <Text>Toggle between Dark and Light Mode</Text>
                    </Item>
                </Section>
            </ListBox>
        </View>
    );
}

export default AboutMe;
