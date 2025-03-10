import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const SettingsPage: React.FC = () => {
    const [notifications, setNotifications] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Email Notifications</Label>
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                            className="toggle-checkbox"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Two-Factor Authentication</Label>
                        <input
                            type="checkbox"
                            checked={twoFactorAuth}
                            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                            className="toggle-checkbox"
                        />
                    </div>
                    <Button className="w-full mt-4">Save Settings</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsPage;
