import React from "react";
import renderer from 'react-test-renderer';


describe('users/SAVE', () => {
    it('Link renders correctly', () => {
        const tree = renderer.create(
            <Link page="http://www.facebook.com">Facebook</Link>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Link renders correctly', () => {
        const tree = renderer.create(
            <Link page="http://www.facebook.com">Facebook</Link>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});