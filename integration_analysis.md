# Key Result Progress Update: Integration Analysis

This document outlines the recommended approach for integrating the frontend with the backend to handle individual key result progress updates and its effect on the parent objective.

## The Core Question

When a user updates the progress of a single Key Result, the backend recalculates the overall progress of the parent Objective. The question is: **What data should the API return in response to this update?**

- **Option A: Return only the updated `KeyResult`**
- **Option B: Return the entire parent `Objective`, including all its (now updated) `KeyResults`**

## Recommendation: Return the Entire Objective

For this application, **Option B is the superior approach.**

### Justification:
1.  **Data Consistency:** The state of a Key Result is tightly coupled to the state of its parent Objective. When a KR's progress changes, the Objective's overall progress and `isCompleted` status also change. Returning the entire Objective ensures the frontend receives a fully consistent and up-to-date state in a single, atomic operation.
2.  **Simpler Frontend Logic:** If the API only returns the updated Key Result, the frontend would be left with stale data for the Objective's progress. It would then need to either:
    - Make a second API call to re-fetch the parent Objective.
    - Re-implement the progress calculation logic on the client side.
    Both options add complexity and potential for bugs. Returning the full Objective eliminates this problem.
3.  **Improved User Experience:** The UI can be updated immediately and correctly with the fresh data from the single API call, providing instant feedback to the user on both the Key Result and the Objective level. The cost of a slightly larger JSON payload is negligible compared to the UX and development benefits.

## Proposed Integration Flow

1.  **Frontend - UI:**
    - An interactive element (like a slider or a number input) should be added to the `KeyResult` component in the main list.
    - On changing the value, this element will trigger the API call.

2.  **Frontend - Service (`key-result.service.ts`):**
    - A new function, `updateKeyResultProgress`, should be created.
    - It will make a `PATCH` request to `/objective/{objectiveId}/key-result/{keyResultId}/progress`.
    - The body will be ` { "currentProgress": new_value } `.
    - Crucially, this function should be typed to expect the entire `OKRType` object in return.

3.  **Backend - Controller & Service:**
    - **This requires a critical bug fix.** The current `KeyResultService.updateProgress` method incorrectly sets the objective's status to `true`.
    - It **must be modified** to:
        a. Update the `currentProgress` of the specified Key Result.
        b. Call the `objectiveService.updateByKeyResultChange(objectiveId)` method, which contains the correct logic for recalculating the objective's overall progress and completion status.
        c. Return the complete and updated parent `Objective` object resulting from that call.

By following this flow, the integration will be efficient, robust, and provide a seamless user experience.
