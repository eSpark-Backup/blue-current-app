import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { fontFamilies } from './fontFamilies';

type MyTextProps = TextProps & {
	fontFamily?: keyof typeof fontFamilies;
	fontSize?: number;
	fontWeight?: TextStyle['fontWeight'];
	color?: string;
	style?: TextStyle | TextStyle[];
	children: React.ReactNode;
};

export default function MyText({
	fontFamily = 'Gilroy-Regular',
	fontSize = 16,
	fontWeight,
	color = '#fff',
	style,
	children,
	...rest
}: MyTextProps) {
	return (
		<Text
			style={[
				styles.text,
				{ fontFamily: fontFamilies[fontFamily], fontSize, fontWeight, color },
				style,
			]}
			{...rest}
		>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	text: {
		color: '#fff',
	},
});
