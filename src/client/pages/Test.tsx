import * as React from "react";

interface TestProps {
}

class Test extends React.Component<TestProps> {
    constructor(props: TestProps) {
        super(props);
    }

    public render() {
        return (
            <React.Fragment>
                    Test page
            </React.Fragment>
        );
    }
}

export default Test;
