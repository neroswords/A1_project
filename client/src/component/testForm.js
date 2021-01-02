import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export const TestForm = () => {
    const [title, setTitle] = useState("")

    return (
        <Form>
            <Form.Field>
                <Input 
                    placeholder="Title" 
                    onChange ={event => setTitle(event.target.value)} />
            </Form.Field>
            <Form.Field>
                <Button onClick={async () => {
                    const test = {title}
                    const response = await fetch('/test', {
                        method : 'POST',
                        headers : {
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(test)
                    })

                    if (response.ok) {
                        console.log("OK")
                    }
                }}>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}