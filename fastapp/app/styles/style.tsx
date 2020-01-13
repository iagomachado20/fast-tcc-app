import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: 'rgb(102,106,209)';
`;

export const Title = styled.Text`
    font-size: 35;
    color: 'rgb(255, 255, 255)';
    font-weight: 600;
    text-align: center;
`;

export const Description = styled.Text`
    font-size: 22;
    text-align: center;
    padding-left: 20;
    padding-right: 20;
    margin-top: 5;
    margin-bottom: 20;
    line-height: 30;
    color: 'rgb(255, 255, 255)';
`;


export const TextInlineWhite = styled.Text`
    text-align: center;
    color: 'rgb(255, 255, 255)';
    font-size: 17;
`;

export const LinkInline = styled.TouchableOpacity`
    text-align: center;
    font-weight: bold;
    color: 'rgb(135, 218, 111)';
    font-size: 17;
`;

export const LinkText = styled.Text`
    text-align: center;
    font-weight: bold;
    color: 'rgb(135, 218, 111)';
    font-size: 17;
`;

export const LinkFooter = styled.View`
    margin-top: 60;
    margin-bottom: 60;
    ${TextInlineWhite} {
        text-align: center;
    }
`;

export const ValidationField = styled.Text`
    text-align: center;
    font-weight: bold;
    background: #F0BA2A;
    border-radius: 5;
    padding-left: 5;
    padding-right: 5;
    padding-top: 5;
    width: 100%;
    padding-bottom: 5;
    color: 'rgb(255, 255, 255)';
    font-size: 17;
`;


export const SlideRange = styled.Slider`
    width: 100%;
`;

export const Avatar = styled.Image`
    width: 140;
    margin-top: 20;
    height: 140;
    border-radius: 100;
`