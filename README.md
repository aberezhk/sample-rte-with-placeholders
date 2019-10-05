# Rich text editor with placeholder support 

An example of a content-editable div with possibility to insert values from other input fields.
Inserted values are implemented as angular dynamic components.
Inserted values are linked to original values in input fields. When value of input changes, inserted value is updated automatically.
If the inserted value was changed from the editor, then link is disabled until inserted value matches value in input field again.
Changes to content-editable div a tracked with MutationObserver

>This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.
